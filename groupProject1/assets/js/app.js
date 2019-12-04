$(document).ready(function(){

//User Inputs collected and passed through the queryURL
$("#searchInputs").on("click", function () {
    var topic = $("#topic").val().trim();
    var location = $("#location").val().trim();
    console.log(topic);
    console.log(location);
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
            topic + "&location=" + location + "&limit=10";

//ajax query with API key
$.ajax({
    url: queryURL,
    headers: {
        Authorization: "Bearer oAi8xqrA80oy6_LsWv-DiIuccat-2euKtqtDJ_gFj86cD0FsczFnpJlTzGAUW2YONB956KEjcVAyh3FmOHTOC3qvkb9YFKnxbzkLQYQKVn2rAdY4e7gMrZ5BUPrdXXYx"
    },
    method: "GET",
    dataType: "JSON",

})

//Take response and output to page
    .then(function(response) {
        var results = response.businesses;
        for (var i = 0; i < results.length; i++) {
            var newDiv = $("<div class='infoList'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            
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
            
            //newDiv.prepend(returnList);
            newDiv.append(p);
            newDiv.append(img);
            newDiv.prepend(yelpPage);

            $("#results_here").prepend(newDiv);
        };
    
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

$("#searchInputs").on("click", function (event) {
    event.preventDefault();

    inputTopic = $("#topic").val().trim();
    inputLocation = $("#location").val().trim();
    inputState = $("#state").val().trim();

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