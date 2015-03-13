var http = new XMLHttpRequest();
        var url = "https://secret-about-box.herokuapp.com/sendLocation";
        
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


        //http.onreadystatechange = function() {//Call a function when the state changes.
          //  if(http.readyState == 4 && http.status == 200) {
            //    alert(http.responseText);
            //}
        //}

            var myLat = 0;
            var myLng = 0;
            var params ="";
            var request = new XMLHttpRequest();
            var me = new google.maps.LatLng(myLat, myLng);
            var myOptions = {
                        zoom: 13, // The larger the zoom number, the bigger the zoom
                        center: me,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
            var map;
            var marker;
            var infowindow = new google.maps.InfoWindow();
            var places;


            function init()
            {
                map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                console.log("Call before getMyLocation()");
                getMyLocation();
                checkresponse();
                console.log("Call after getMyLocation()");
            }

            function checkresponse(){
                http.onreadystatechange = function() {//Call a function when the state changes
                    if(http.readyState == 4 && http.status == 200) {
                        console.log(http.responseText);
                        locations(); 

                    }
                }
            }
            
            
            function locations(){
                var info = JSON.parse(http.responseText);
                for (id in info) {
                    var myLatlng = new google.maps.LatLng(info[id].lat,info[id].lng);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: info[id].login
                        });

                    //var contentString = info[id].login;
                    //var infowindow = new google.maps.InfoWindow({
                    //content: contentString
                    //});
                    google.maps.event.addListener(marker, 'click', function() {
                    infowindow.close();
                    infowindow.setContent(info[id].login);
                    infowindow.open(map, marker);
                });


                    marker.setMap(map);
                }
                google.maps.event.addDomListener(window, 'load', initialize);

            }

            function getMyLocation() {
                console.log("In getMyLocation()");
                if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
                    navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLng = position.coords.longitude;
                        params="login=ErinHolleman&" + "lat=" + myLat +"&lng=" + myLng;
                        http.send(params);
                        console.log(params);
                        renderMap();
                    });
                }
                else {
                    alert("Geolocation is not supported by your web browser.  What a shame!");
                }
                console.log("Leaving getMyLocation()");
            }

            function renderMap()
            {
                me = new google.maps.LatLng(myLat, myLng);
                
                // Update map and go there...
                map.panTo(me);
    
                // Create a marker
                
            }
      }