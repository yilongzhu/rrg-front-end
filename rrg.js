var lat;
var lng;

function getLocation() {
    var output = document.getElementById("address");

    if (!navigator.geolocation){
        output.innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    function success(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        onSuccess(lat, lng);
    }
    function error() {
        output.innerHTML = "Please enable location to use this tool.";
    }

    if (lat == null && lng == null)
        navigator.geolocation.getCurrentPosition(success, error);
    else {
        onSuccess(lat, lng);
    }
}

function onSuccess(lat, lng) {
    rad = getRadius();
    price = getPrice();
    getRestaurant(lat, lng, rad, price);
}

function getRadius() {
    var rad = parseInt(document.querySelector('input[name="rad"]:checked').value);
    return rad / 0.00062137;
}

function getPrice() {
    return parseInt(document.querySelector('input[name="price"]:checked').value);
}

function getRestaurant(lat, lng, rad, price) {
    var apiURL = "https://localhost:8080/api/random";
    $.post(apiURL , { lat: lat, lng: lng, rad: rad, minPrice: price }, function( data ) {
        var nm = document.getElementById("name");
        var addr = document.getElementById("address");
        var mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + data.lat + "," + data.lng + "&destination_place_id=" + data.place_id;
        document.getElementById("directions").href = mapsLink;
        nm.innerHTML = data.name;
        addr.innerHTML = data.formatted_address;
    }, "json");
}