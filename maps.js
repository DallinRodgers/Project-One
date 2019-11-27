var map;
let latResult = 40.7608;
let lngResult = -111.891;

function initMap() {
  // New Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latResult, lng: lngResult },
    zoom: 14
  });
  //   New Marker
  //   var marker = new google.maps.Marker({
  //     position: { lat: 40.7608, lng: -111.891 },
  //     map: map
  //   });

  //   Add Marker Function
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  //   All multiple marks to map
  //   addMarker({ lat: 40.7608, lng: -111.891 });
  //   addMarker({ lat: 40.7608, lng: -111.893 });
  //   addMarker({ lat: 40.7608, lng: -111.895 });
}

document.querySelector("button").addEventListener("click", () => {
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  console.log(city);

  city = city.split("");
  for (let i = 0; i < city.length; i++) {
    if (city[i] === " ") {
      city[i] = "+";
    }
  }
  city = city.join("");
  console.log(city);

  geoCode(city, state);
});

function geoCode(city, state) {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyAQniP-3rD977wqZuDvbfDQjBeUNRlXKDo`
  )
    .then(result => {
      // body: ReadableStream, this is found in the returned results from the api
      // This will return a promise and convert it from json to javascript
      return result.json();
    })
    .then(data => {
      //   console.log(data);
      latResult = data.results[0].geometry.location.lat;
      lngResult = data.results[0].geometry.location.lng;
      console.log(latResult);
      console.log(lngResult);
      initMap();
    })
    .catch(error => console.log(error));
}

// geoCode();
