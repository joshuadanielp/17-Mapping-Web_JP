// var myMap = L.map("map", {
//     center: [37.7749, -122.4194],
//     zoom: 13
//   });
  
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
//   var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//   d3.json(url, function(response) {
  
//     console.log(response);
  
//     var earthquakeArray = [];
  
//     for (var i = 0; i < response.length; i++) {
//       var location = response[i].location;
  
//       if (location) {
//         earthquakeArray.push([location.coordinates[1], location.coordinates[0]]);
//       }
//     }
  
//     var heat = L.heatLayer(earthquakeArray, {
//       radius: 20,
//       blur: 35
//     }).addTo(myMap);
  
//   });

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
 
    // var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    //         tileSize: 512,
    //         maxZoom: 18,
    //         zoomOffset: -1,
    //         id: "mapbox/streets-v11",
    //         accessToken: API_KEY
    //     });


    //FIX THIS VVV //
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
      
    // var earthquakes = new L.LayerGroup()

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12
      // layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(map);
    console.log(earthquakes)

    L.geoJson(earthquakes,{

    }).addTo(map)
}
  
function createMarkers(type) {
  console.log(type)
    var locations = type.metadata;
  
    // Initialize an array to hold earthquake markers
    var earthquakeMarkers = [];
  
    // Loop through the locations array
    for (var index = 0; index < locations.length; index++) {
      var locations = locations[index];
  
      // For each locations, create a marker and bind a popup with the locations
      var earthquakeMarkers = L.marker([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]])
        .bindPopup("<h3>" + locations.name + "<h3><h3>Capacity: " + locations.capacity + "</h3>");
  
      // Add the marker to the earthquakeMarkers array
      earthquakeMarkers.push(earthquakeMarkers);
    }
  
    // Create a layer group made from the earthquake markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
}

// Perform an API call to the USGS API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMap);