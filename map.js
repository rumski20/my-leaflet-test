    //popup template
    var template = "<h6>{TREE_ID}</h6>"
                    "<p>Species: {d_SPECIES}<br>"
                    "DBH: {DBH2014ORP}</p>"

    // create map
    var map = L.map('map');

    // add tile layer (mapbox basemap)
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/rumski20.i6pp2mja/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    // add campus trees feature layer
    L.esri.featureLayer("http://maps.northpointgis.com/arcgis/rest/services/campus_trees/FeatureServer/0", {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(L.Util.template(template, feature.properties));
        }
    }).addTo(map);

    // find location
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are here! <br>Or at least nearby.").openPopup();
        L.circle(e.latlng, radius).addTo(map);
        map.locate({
            setView: true,
            maxZoom: 18
        });
    }

    function onLocationError(e) {
        alert(e.message + " Using default location instead.");
        map.setView([44.97177944969965, -93.2433839753503], 18);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);