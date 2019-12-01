$(document).ready(function(){

//User Inputs collected and passed through the queryURL
$("#searchInputs").on("click", function () {
    var topic = $("#topic").val().trim();
    var location = $("#location").val().trim();
    console.log(topic);
    console.log(location);
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
            topic + "&location=" + location + "&limit=5";

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

});