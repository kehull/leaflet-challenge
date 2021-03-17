// Creating map object
var myMap = L.map("mapid", {
  center: [41.850033, -87.6500523],
  zoom: 5,
});

// Adding tile layer to the map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
).addTo(myMap);

// legend
var legend = L.control();

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depths:</h4>";
  div.innerHTML += '<i style="background: #477AC2"></i><span>Shallow</span><br><br>';
  div.innerHTML += '<i style="background: #448D40"></i><span>Mid-Focus</span><br><br>';
  div.innerHTML += '<i style="background: #DE4C1F"></i><span>Deep focus</span><br>';

  return div;
};

legend.addTo(myMap);

// Store API query variables
var url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var depthInfo = [];

// Grab the data with d3
var data = d3.json(url, function (response) {
  console.log(response);
  handleData(response);
});

function handleData(response) {
  for (var i = 0; i < response.features.length; i++) {
    // Set the variables
    var lat = response.features[i].geometry.coordinates[1];
    var long = response.features[i].geometry.coordinates[0];
    var depth = response.features[i].geometry.coordinates[2];
    var size = response.features[i].properties.mag;
    var loc = response.features[i].properties.place;

    depthInfo.push(Number(depth));

    if (depth < 17) {
      var color = "#477AC2";
      console.log("shallow")
    }
    else if (depth <= 33 && depth > 17) {
      var color = "#448D40"
      console.log("mid-focus")
    }
    else if (depth > 33) {
      var color = "#DE4C1F"
      console.log("deep-focus")
    }
    // Check for location property
    if (lat && long && depth && size) {
      var location = [lat, long];
      // var color = "";
      // create marker
      L.circle(location, {
        fillOpacity: 0.75,
        color: color,
        fillColor: color,
        // Adjust radius
        radius: size * 12000,
      })
        .bindPopup(
          "<h1>" +
            loc +
            "</h1> <hr> <h3>Magnitude: " +
            size +
            "</h3> <hr> <h3>Depth: " +
            depth +
            "</h3>"
        )
        .addTo(myMap);
    }
  }
}


// TDL: ADD LEGEND
// BONUS: ADD TECTONIC PLATES DATASET
// BONUS: ADD BASE MAPS
// BONUS: ADD LAYER CONTROLS
