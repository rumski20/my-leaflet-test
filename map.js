    //popup template
    var template = "<h4>{TREE_ID}</h4><p>Species: {d_SPECIES}<br>DBH: {DBH2014ORP}</p>";

    // create map
    var map = L.map('map');

    // add tile layer (mapbox basemap)
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/rumski20.i6pp2mja/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    // add campus trees dynamic layer
    dynLayer = L.esri.dynamicMapLayer("http://maps.northpointgis.com/arcgis/rest/services/campus_trees/MapServer/", {
        opacity : 0.8,
        layers: "0"
    });
    map.addLayer(dynLayer);

    //Identifying Dynamic Map Service Features
    map.on("click", function(e) {
        dynLayer.identify(e.latlng, function(data) {
            console.log(data.results);
            if(data.results.length == 1) {
                //configurePopup(data.results[0]);
              /*//Popup text should be in html format.  Showing the Storm Name with the type
                popupText =  "<b>" + (data.results[0].attributes.EVENTID || data.results[0].attributes.NAME) + "<b>";*/

                //Add Popup to the map when the mouse was clicked at
/*                var popup = L.popup()
                    .setLatLng(e.latlng)
                    .setContent(popupText)
                    .openOn(map);*/
            }
        });
    });
    
    

    // find location
    map.locate({
        setView: true,
        maxZoom: 18
    });
    
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are here! <br>Or at least nearby.").openPopup();
        L.circle(e.latlng, radius).addTo(map);

    }

    function onLocationError(e) {
        alert(e.message + " Using default location instead.");
        map.setView([44.97177944969965, -93.2433839753503], 18);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // configure popup

