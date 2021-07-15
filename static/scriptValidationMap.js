var marker;
var center = [ 35.705048,-0.631281];
/*function mapContent()
{
    if(localStorage.getItem("LngLat") !== null)
    {
        center = JSON.parse(localStorage["LngLat"]);
        $("#plusDeSpecification").val(localStorage["plusDeSpecification"]);
    }
		var api_key = '7kvbZdgzwMCDRjDyFrD0ZNECa1yqiubx';
		var roundLatLng = Formatters.roundLatLng;
        var popup = new tt.Popup({
            offset: 35
        });
        var map = tt.map({
            key: api_key,
            container: 'map',
            dragPan: !isMobileOrTablet(),
            center: center,
            zoom: 15
        });
        map.addControl(new tt.GeolocateControl());
map.addControl(new tt.FullscreenControl())
        marker = new tt.Marker({
            draggable: false
        }).setLngLat(center).addTo(map);

       
        function markerChangePos() {
            var lngLat = map.getCenter();
            lngLat = new tt.LngLat(roundLatLng(lngLat.lng), roundLatLng(lngLat.lat));
            marker.setLngLat(lngLat);
        }
        map.on('move',markerChangePos);
        
    }*/
    function mapContent()
    {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2hhbGVkYmVuZGlhIiwiYSI6ImNrcjRycTU0ZTJ5NHIycHFweWZibG0yMGUifQ.fgzEZYCOPmamVjLbNCuPiw';
        if(localStorage.getItem("LngLat") !== null)
        {
            center = JSON.parse(localStorage["LngLat"]);
            $("#plusDeSpecification").val(localStorage["plusDeSpecification"]);
        }
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center : center,
            zoom : 15
        });
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserLocation : false
        }));
        marker = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);
        map.on('move', function(e) {
            marker.setLngLat(map.getCenter())

        });
        

    }