using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using SimpleJSON;

public class RoomList : MonoBehaviour {

	public Button button;
	public Rooms rooms;

	public void ManualPopulate() {
		Populate (rooms.rooms);
	}

	public void Populate(List<Hashtable> rooms) {
		Debug.Log ("Building Room List");
		int y = 0;
		int padding = 35;
		foreach (Hashtable room in rooms) {
			Button btn = createButton();
			btn.transform.SetParent(transform);
			btn.transform.position = new Vector3(340 , y, 0);
			btn.onClick.AddListener(delegate() {
				this.rooms.JoinRoom((string)room["id"]);
			});
			Text label = btn.transform.FindChild("Text").GetComponent<Text>();
			label.text = room["name"].ToString();

			y += padding;
		}
	}

	public Button createButton() {
		return (Button)Instantiate(this.button);
	}

}


// CHECK WHY THE JOIN ROOM IS NOT WORKING
// SEND THE DUID WITH THE CONNECTION SO WE CAN BROADCAST TO OTHERS IN THE SAME ROOM