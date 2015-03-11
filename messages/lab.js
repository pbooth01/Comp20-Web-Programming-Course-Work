// Your JavaScript goes here...

var request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open("GET", "data.json", true);

request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var myArr = JSON.parse(request.responseText);
        parse(myArr);  
    }
}

request.send(null);

function parse(arr){

	var i = 0;

	var changeloc = document.getElementById("messages");

	changeloc.innerHTML = '<p>';

	for (i = 0; i < arr.length; i++) {
		changeloc.innerHTML = changeloc.innerHTML + '<p>' + 
						'<span class = "con">' + arr[i].content + '</span>' + 
						" " +
						'<span class = "use">' + arr[i].username + '</span>' + '</p>'; 
	}
	changeloc.innerHTML = changeloc.innerHTML + '</p>'
}