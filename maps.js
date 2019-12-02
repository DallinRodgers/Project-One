var map;
let latResult = 40.7608;
let lngResult = -111.891;

function initMap() {
  // New Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latResult, lng: lngResult },
    zoom: 14
  });

  //   Add Marker Function
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  // Add markers
  for (var i = 0; i < markerArray.length; i++) {
    addMarker(markerArray[i]);
  }
}

// Array of marker locations
// Locations will come from yelp results
var markerArray = [
  { lat: 40.7608, lng: -111.891 },
  { lat: 40.7614, lng: -111.888 },
  { lat: 40.76, lng: -111.893 }
];

document.querySelector("button").addEventListener("click", () => {
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;

  //   Remove blank spaces from string and replace with "+"
  //   This is needed for geoCode
  city = city.split("");
  for (let i = 0; i < city.length; i++) {
    if (city[i] === " ") {
      city[i] = "+";
    }
  }
  city = city.join("");

  geoCode(city, state);
});

// This will get the latitude and longitude of the entered city and state
// Then call initMap for the new location
function geoCode(city, state) {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyAQniP-3rD977wqZuDvbfDQjBeUNRlXKDo`
  )
    .then(result => {
      return result.json();
    })
    .then(data => {
      // Get longitude and latitude for global variables
      latResult = data.results[0].geometry.location.lat;
      lngResult = data.results[0].geometry.location.lng;
      // Display new location on map
      initMap();
    })
    .catch(error => console.log(error));
}
