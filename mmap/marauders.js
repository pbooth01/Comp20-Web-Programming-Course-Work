var http = new XMLHttpRequest();
        var url = "https://secret-about-box.herokuapp.com/sendLocation";
        
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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
                    var location = new google.maps.LatLng(info[id].lat,info[id].lng);
                    var marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        title: info[id].login
                        });
                    setinfowindow(info, marker);
                    marker.setMap(map);
                }
                //google.maps.event.addDomListener(window, 'load', initialize);

            }

            function toRad(Value) {
                /** Converts numeric degrees to radians */
                return Value * Math.PI / 180;
            }

            function haversine(info, marker){
                var R = 6371000; // metres
                var φ1 = toRad(myLat);
                var φ2 = toRad(myLng);
                var Δφ = toRad(info.lat - myLat);
                var Δλ = toRad(info.lng - myLng);

                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                var d = R * c;
                return d;
                console.log(d);
            }

            function setinfowindow(info, marker){
                var contentString = marker.title;
                var distance = haversine(marker);

                var infowindow = new google.maps.InfoWindow({
                content: contentString + "<p> distance from origin: " + distance + "</p>"
                });

                google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
                });

            }

            function getMyLocation() {
                console.log("In getMyLocation()");
                if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
                    navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLng = position.coords.longitude;
                        params="login=ErinHolleman&" + "lat=" + myLat +"&lng=" + myLng;
                        http.send(params);
                        console.log(params); //Check to make sure my request is the right format
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
            }
            