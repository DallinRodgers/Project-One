var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7608, lng: -111.891 },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: { lat: 40.7608, lng: -111.891 },
    map: map
  });
}
