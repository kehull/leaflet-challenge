// Creating map object
var myMap = L.map("mapid", {
    center: [41.850033, -87.6500523],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Grab the data with d3
  d3.json(url, function(response) {
    
    // Loop through data
    for (var i = 0; i < response.features.length; i++) {
  
      // Set the variables
      var lat = response.features[i].geometry.coordinates[1]
      var long = response.features[i].geometry.coordinates[0]
      var depth = response.features[i].geometry.coordinates[2]
      var size = response.features[i].properties.mag
  
      // Check for location property
      if (lat && long && depth && size) {
        var location = [lat, long]
        var color = "#fff"
        // create marker
        L.circle(location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: 12000
        }).bindPopup("popup").addTo(myMap); //WRITE APPROPRIATE POPUP MESSAGE (MAGNITUDE, LOCATION, DEPTH), ADD ONCLICK 
        // WRITE IF/ELSE STATEMENTS TO CHANGE MARKER COLOR/SIZE BASED ON PARAMETERS
    }
}

      }
    
  );

  // TDL: ADD LEGEND
  // BONUS: ADD TECTONIC PLATES DATASET
  // BONUS: ADD BASE MAPS
  // BONUS: ADD LAYER CONTROLS