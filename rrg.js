var lat;
var lng;

function getLocation() {
    var output = document.getElementById("name");

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

function getRadius() {;
    return parseInt(range / 0.00062137);
}

function getPrice() {
    if (anyCheckbox.checked == true)
        return "1,2,3,4"

    var checkedBoxes = document.querySelectorAll('input[name="price"]:checked');
    var priceString = "";
    checkedBoxes.forEach(function(cb) {
        priceString += cb.value + ",";
    });

    return priceString.substring(0, priceString.length-1);
}

function parseAddress(addressArray) {
    var address = "";
    for (var i = 0; i < 4; i++) {
        if (addressArray[i] != null && addressArray[i] != "")
            address += addressArray[i] + ", ";
    }
    address += addressArray[5] + " " + addressArray[4];
    return address;
}

var apiURL = "https://yilongzhu.com:8443/rrg";
var nm;
var addr;
var dir;
var img;
$(document).ready(function() {
    nm = document.getElementById("name");
    addr = document.getElementById("address");
    dir = document.getElementById("directions");
    img = document.getElementById("place")
});
function getRestaurant(lat, lng, rad, price) {
    $.get(apiURL , { latitude: lat, longitude: lng, radius: rad, price: price }, function( data ) {
        var address = parseAddress(data.address);
        var mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
        // console.log(data);
        img.style.backgroundImage = "url(" + data.image_url + ")";
        nm.innerHTML = data.name;
        addr.innerHTML = address;
        dir.href = mapsLink;
    }, "json");
}
