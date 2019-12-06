// This is for the Yelp API
$(document).ready(function() {
  //User Inputs collected and passed through the queryURL
  $("#searchInputs").on("click", function() {
    var topic = $("#topic")
      .val()
      .trim();
    var location = $("#location")
      .val()
      .trim();
    console.log(topic);
    console.log(location);
    var queryURL =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
      topic +
      "&location=" +
      location +
      "&limit=10";

    //ajax query with API key
    $.ajax({
      url: queryURL,
      headers: {
        Authorization:
          "Bearer oAi8xqrA80oy6_LsWv-DiIuccat-2euKtqtDJ_gFj86cD0FsczFnpJlTzGAUW2YONB956KEjcVAyh3FmOHTOC3qvkb9YFKnxbzkLQYQKVn2rAdY4e7gMrZ5BUPrdXXYx"
      },
      method: "GET",
      dataType: "JSON"
    })

      //Take response and output to page
      .then(function(response) {
        var results = response.businesses;
        markerArray = [];
        for (var i = 0; i < results.length; i++) {
          var newDiv = $("<div class='infoList'>");

          //yelp rating converted to star rating.
          var rating = results[i].rating;
          if (rating === 0) {
            var imglink = "./assets/images/regular_0.png"
          }
          else if (rating === 1) {
            var imglink = "./assets/images/regular_1.png"
          }
          else if (rating === 1.5) {
            var imglink = "./assets/images/regular_1_half.png"
          }
          else if (rating === 2) {
            var imglink = "./assets/images/regular_2.png"
          }
          else if (rating === 2.5) {
            var imglink = "./assets/images/regular_2_half.png"
          }
          else if (rating === 3) {
            var imglink = "./assets/images/regular_3.png"
          }
          else if (rating === 3.5) {
            var imglink = "./assets/images/regular_3_half.png"
          }
          else if (rating === 4) {
            var imglink = "./assets/images/regular_4.png"
          }
          else if (rating === 4.5) {
            var imglink = "./assets/images/regular_4_half.png"
          }
          else if (rating === 5) {
            var imglink = "./assets/images/regular_5.png"
          }

          var imgtag = $("<img>");
            imgtag.attr("src", imglink);
            imgtag.attr("title", results[i].rating);

          var p = $("<p class='rating'>").text("Rating: ");
          p.append(imgtag);

          var returnList = $("<div>");
          returnList.text(results[i].name);

          var img = $("<img class='restImg'>");
          img.attr("src", results[i].image_url);

          var yelpPage = $("<a>" + results[i].name + "</a>");
          yelpPage.attr("href", results[i].url);

          var latitude = results[i].coordinates.latitude;
          var longitude = results[i].coordinates.longitude;
          console.log(latitude);
          console.log(longitude);

          var yelpLocation = {
            location: { lat: latitude, lng: longitude },
            name: results[i].name
          }

          markerArray.push(yelpLocation);

          // markerArray.push({ lat: latResult, lng: lngResult });

          //newDiv.prepend(returnList);
          newDiv.append(p);
          newDiv.append(img);
          newDiv.prepend(yelpPage);

          $("#results_here").prepend(newDiv);
        }
        initMap();
      });

    //Prevent form from reloading page
    $("#searchForm").on("click", function(event) {
      event.preventDefault();
    });
  });

  var firebaseConfig = {
    apiKey: "AIzaSyA-dim15cm5AfNhNwNCyKTSE8FY4C4O6Mc",
    authDomain: "project-1-9af89.firebaseapp.com",
    databaseURL: "https://project-1-9af89.firebaseio.com",
    projectId: "project-1-9af89",
    storageBucket: "project-1-9af89.appspot.com",
    messagingSenderId: "438234487611",
    appId: "1:438234487611:web:9d47fe8e9137861f80351e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var inputTopic = "";
  var inputLocation = "";
  var inputState = "";

  $("#searchInputs").on("click", function(event) {
    event.preventDefault();

    inputTopic = $("#topic")
      .val()
      .trim();
    inputLocation = $("#location")
      .val()
      .trim();
    inputState = $("#state")
      .val()
      .trim();

    $("#topic").val("");
    $("#location").val("");
    $("#state").val("");

    database.ref().push({
      inputTopic: inputTopic,
      inputLocation: inputLocation,
      inputState: inputState,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  //database.ref().on("child_added", function(childSnapshot) {
  //$("#history_here").append("<tr><td>" + childSnapshot.val().inputTopic +
  //"</td><td>" + childSnapshot.val().inputLocation +
  //"</td></tr>");
  //})
});

// This is for the Google Maps API
var map;
let latResult = 40.7608;
let lngResult = -111.891;

// Array of marker locations
// Locations will come from yelp results
var markerArray = [];

function initMap() {
  // New Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latResult, lng: lngResult },
    zoom: 12
  });

  //   Add Marker Function
  function addMarker(pinPosition) {
    console.log(pinPosition);
    var marker = new google.maps.Marker({
      position: pinPosition.location,
      map: map,
      title: pinPosition.name
    });
  }

  // Add markers
  for (var i = 0; i < markerArray.length; i++) {
    addMarker(markerArray[i]);
  }
}

// How to add new locations to markerArray
// markerArray.push({ lat: latResult, lng: lngResult });

document.querySelector("button").addEventListener("click", () => {
  let city = document.querySelector("#location").value;
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
      //   initMap();
    })
    .catch(error => console.log(error));
}
