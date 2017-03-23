using UnityEngine;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Net.Sockets;

public class Client : MonoBehaviour {

	const int BUFFER_SIZE = 4096;

	private TcpClient client;
	private Stream stream;
	private byte[] readBuffer = new byte[BUFFER_SIZE];
	private string message = string.Empty;

	public bool autoConnect = false;
	
	// Events
	public delegate void ResponseHandler(string message);
	public static event ResponseHandler response;

	void Start() {
		if (autoConnect) {
			Connect ();
		}
	}

	public void Connect() {

		try {
			client = new TcpClient();
			Debug.Log ("Connecting to server");

			client.Connect("127.0.0.1", 8888);
			Debug.Log ("Connected to server");

			stream = client.GetStream();

			byte[] bb = new Byte[BUFFER_SIZE];
			stream.Read (bb, 0, BUFFER_SIZE);

			Debug.Log (System.Text.Encoding.UTF8.GetString(bb));

			stream.BeginRead(readBuffer, 0, BUFFER_SIZE, new AsyncCallback(ReceiveData), null);

		} catch (Exception e) {
			Debug.Log ("Error " + e.StackTrace);
		}

	}

	public void ReceiveData(IAsyncResult ar) {
		int bytesRead;

		try {

			bytesRead = stream.EndRead(ar);
			if (bytesRead < 1) {
				return;
			}

			message = Encoding.ASCII.GetString (readBuffer, 0, bytesRead);
			response(message);

			stream.BeginRead(readBuffer, 0, BUFFER_SIZE, new AsyncCallback(ReceiveData), null);

		} catch(Exception e) {
			Debug.Log ("An error occurred while reading: " + e.StackTrace);
		}
	}

	public void Disconnect() {
		client.Close ();
		Debug.Log ("Disconnected from server");
	}

	public void Send(string message) {
		ASCIIEncoding encoding = new ASCIIEncoding();
		byte[] bytes = encoding.GetBytes(message);
		Debug.Log ("Transmitting...");
		
		stream.Write(bytes, 0, bytes.Length);
	}
}
