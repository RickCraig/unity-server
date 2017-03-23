using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System;

public class Helper : MonoBehaviour {

	public static string GetUniqueID(){
		var random = new System.Random();                     
		DateTime epochStart = new System.DateTime(1970, 1, 1, 8, 0, 0, System.DateTimeKind.Utc);
		double timestamp = (System.DateTime.UtcNow - epochStart).TotalSeconds;
		
		string uniqueID = String.Format("{0:X}", Convert.ToInt32(timestamp)) +
			"-"+String.Format("{0:X}", Convert.ToInt32(Time.time*1000000)) +
			"-"+String.Format("{0:X}", random.Next(1000000000));
		
		return uniqueID;
	}

	public static Response Parse(string msg) {
		char[] delimiters = {'|'};
		string[] split = msg.Split (delimiters);
		Response response = new Response();
		response.id = split [0];
		response.content = split[1];
		return response;
	}
}
