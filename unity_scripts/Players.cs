using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Players : MonoBehaviour {

	public Client client;
	public string playerName;
	public string status;
	public string room;
	public string duid;

	public void Awake() {
		this.duid = SystemInfo.deviceUniqueIdentifier;
	}

	public void create(InputField name) {
		update (name.text, this.status);
	}

	public void changeStatus(string status) {
		update (this.playerName, status);
	}

	public void update(string name, string status) {
		string uid = Helper.GetUniqueID();
		Client.ResponseHandler handler;
		handler = (string msg) => {
			Response response = Helper.Parse(msg);
			if (response.id == uid) {
				Debug.Log (response.content);
			}
			
			Client.response -= handler;
		};
		
		Client.response += handler;
		string command = uid + ":p:" + duid;

		if (name != null) {
			this.playerName = name;
			command += ":" + name;
		}

		if (status != null) {
			this.status = status;
			command += ":" + status;
		}

		client.Send (command);
	}

}
