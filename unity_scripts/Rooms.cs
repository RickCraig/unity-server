using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using SimpleJSON;

public class Rooms : MonoBehaviour {

	public Client client;
	public Players players;
	public List<Hashtable> rooms = new List<Hashtable>();

	public void All() {

		string uid = Helper.GetUniqueID();
		Client.ResponseHandler handler;
		handler = (string msg) => {
			Response response = Helper.Parse(msg);
			if (response.id == uid) {
				JSONArray content = JSON.Parse(response.content).AsArray;
				foreach (JSONNode room in content) {
					Hashtable roomObject = new Hashtable();
					roomObject.Add("name", room["n"]);
					roomObject.Add("id", room["id"]);
					roomObject.Add ("started", room["g"]["s"].AsInt == 1);
					roomObject.Add ("ended", room["g"]["e"].AsInt == 1);
					roomObject.Add ("players", room["players"].AsArray);
					this.rooms.Add(roomObject);
				}
				Debug.Log ("Gathered " + this.rooms.Count + " rooms");
			}

			Client.response -= handler;
		};

		Client.response += handler;
		client.Send (uid + ":rs:all");
	}

	public void create(InputField field) {
		create (field.text);
	}

	public void create(string name) {
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
		client.Send (uid + ":r:" + name);
	}

	public void JoinRoom(string id) {
		this.players.room = id;
		string uid = Helper.GetUniqueID();
		Client.ResponseHandler handler;
		handler = (string msg) => {
			Response response = Helper.Parse(msg);
			if (response.id == uid) {
				Debug.Log (response.content);
			}
			
			Client.response -= handler;
		};
		
		client.Send (uid + ":jr:" + this.players.duid + ":" + id );
	}

}
