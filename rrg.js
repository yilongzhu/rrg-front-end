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
    console.log(price);
    getRestaurant(lat, lng, rad, price);
}

function getRadius() {;
    return parseInt(range / 0.00062137);
}

function getPrice() {
    if (anyCheckbox.checked == true)
        return "1,2,3,4";

    return $("input[name=price]:checked").map(
        function() {return this.value;}).get().join(",");
}

var apiURL = "https://yilongzhu.com:8443/rrg";
var nm = document.getElementById("name");
var addr = document.getElementById("address");
var dir = document.getElementById("directions");
var img = document.getElementById("place")

function getRestaurant(lat, lng, rad, price) {
    $.get(apiURL , {latitude: lat, longitude: lng, radius: rad, price: price}, data => {
        var address = data.address.join(", ");
        var mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
        img.style.backgroundImage = "url(" + data.image_url + ")";
        nm.innerHTML = data.name;
        addr.innerHTML = address;
        dir.href = mapsLink;
    }, "json");
}
