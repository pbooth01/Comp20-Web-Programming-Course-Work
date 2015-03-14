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
                        var distance = haversine(info[id].lat, info[id].lng);
                        setinfowindow(distance, marker);
                        marker.setMap(map);   
                }
                renderMap();

            }

            function toRad(Value) {
                /** Converts numeric degrees to radians */
                return Value * Math.PI / 180;
            }
            //taken from stack overflow
            function haversine(lat, lng){
                console.log(lat);
                console.log(lng);
                var R = 6371000; // km
                var myLatRad = toRad(myLat);
                var myLngRad = toRad(myLng);
                var lat1 = toRad(lat);
                var lng1 = toRad(lng);

                dLat = lat1 - myLatRad;
                dLng = lng1 - myLngRad;

                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(myLatRad) * Math.cos(lat1) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                console.log(R * c);
                return (R * c / 1609.34); //converts to miles
            }

            function setinfowindow(distance, marker){
                var contentString = marker.title;
                var distance1 = distance;
                //var distance = haversine(lat, lng);

                var infowindow = new google.maps.InfoWindow({
                content: contentString + "<p> distance from ErinHolleman = " + distance1 + "miles</p>"
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
                        //renderMap();
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

                marker = new google.maps.Marker({
                    position: me,
                    title: "ErinHolleman"
                });
                marker.setMap(map);

                var infowindow = new google.maps.InfoWindow({
                content: marker.title + "<p><img src=" + '<IMG BORDER="0" ALIGN="center" SRC="Nightcrawler.jpg">' + "</p>"
                });
                    
                // Open info window on click of marker
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(html);
                    infowindow.open(map, marker);
                });
                
                
            }
            