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

  var depthInfo = []
  
  // Grab the data with d3
  d3.json(url, function(response) {

    for (var i = 0; i < response.features.length; i++) {
  
      // Set the variables
      var lat = response.features[i].geometry.coordinates[1]
      var long = response.features[i].geometry.coordinates[0]
      var depth = response.features[i].geometry.coordinates[2]
      var size = response.features[i].properties.mag
      var loc = response.features[i].properties.place
      
      // Check for location property
      if (lat && long && depth && size) {
        var location = [lat, long]
        var color = "#fff"
        // create marker
        L.circle(location, {
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: size*24000
        }).bindPopup("<h1>" + loc + "</h1> <hr> <h3>Magnitude: " + size + "</h3> <hr> <h3>Depth: " + depth + "</h3>").addTo(myMap);  
        // WRITE IF/ELSE STATEMENTS TO CHANGE MARKER COLOR/SIZE BASED ON PARAMETERS
    }


    // Create a new choropleth layer
  geojson = L.choropleth(response, {

    // Define what  property in the features to use
    valueProperty: "depth",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h1>" + loc + "</h1> <hr> <h3>Magnitude: " + size + "</h3> <hr> <h3>Depth: " + depth + "</h3>" + feature.properties.MHI2016);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Earthquake Size</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

}});

    
//     // Loop through data
//     for (var i = 0; i < response.features.length; i++) {
  
//       // Set the variables
//       var lat = response.features[i].geometry.coordinates[1]
//       var long = response.features[i].geometry.coordinates[0]
//       var depth = response.features[i].geometry.coordinates[2]
//       var size = response.features[i].properties.mag
//       var loc = response.features[i].properties.place

//       depthInfo.push(Number(depth))
  
//       // Check for location property
//       if (lat && long && depth && size) {
//         var location = [lat, long]
//         var color = "#fff"
//         // create marker
//         L.circle(location, {
//         fillOpacity: 0.5,
//         color: "white",
//         fillColor: color,
//         // Adjust radius
//         radius: size*24000
//         }).bindPopup("<h1>" + loc + "</h1> <hr> <h3>Magnitude: " + size + "</h3> <hr> <h3>Depth: " + depth + "</h3>").addTo(myMap);  
//         // WRITE IF/ELSE STATEMENTS TO CHANGE MARKER COLOR/SIZE BASED ON PARAMETERS
//     }
// }

//       }
    
//   );
//   console.log(depthInfo);

  // TDL: ADD LEGEND
  // BONUS: ADD TECTONIC PLATES DATASET
  // BONUS: ADD BASE MAPS
  // BONUS: ADD LAYER CONTROLS