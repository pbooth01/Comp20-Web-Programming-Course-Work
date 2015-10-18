function parse(){

	//Getting the request
	request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open("GET", "data.json", true);
	

	request.onreadystatechange = print; //on state change call the print function

	
	function print(){	
    	
    	if (request.readyState == 4 && request.status == 200) {
      		
      		var myArr = JSON.parse(request.responseText); //my array contains data

      		//change loc is making changes to the location with ID messages
			var changeloc = document.getElementById('messages'); 

			//How I want the content contained in the HTML
			changeloc.innerHTML = '<div>';
			for (id in myArr) {
				changeloc.innerHTML = changeloc.innerHTML + '<p>' + 
						'<span class = "con">' + myArr[id].content + '</span>' + 
						" " +
						'<span class = "use">' + myArr[id].username + '</span>' + '</p>'; 
			}
			changeloc.innerHTML = changeloc.innerHTML + '</div>'
		}
	}
	request.send();
}