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
                    google.maps.event.addListener(marker, 'click', function() {
                    infowindow.close();
                    infowindow.setContent(info[id].login);
                    infowindow.open(map, this);
                });


                    marker.setMap(map);
                }

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
                marker = new google.maps.Marker({
                    position: me,
                    title: "Here I Am!"
                });
                marker.setMap(map);
                    
                // Open info window on click of marker
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(marker.title);
                    infowindow.open(map, marker);
                });
                /*
                // Calling Google Places API
                var request = {
                    location: me,
                    radius: '500',
                    types: ['food']
                };
                service = new google.maps.places.PlacesService(map);
                service.search(request, callback);
                */
            }
            
            // Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
            /*function callback(results, status)
            {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    alert("Got places back!");
                    places = results;
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }*/
            
            function createMarker(place)
            {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.close();
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
      }