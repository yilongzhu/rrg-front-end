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
    // price = getPrice();
    getRestaurant(lat, lng, rad);
}

function getRadius() {
    var rad = parseInt(document.querySelector('input[name="rad"]:checked').value);
    return rad / 0.00062137;
}

function getPrice() {
    return parseInt(document.querySelector('input[name="price"]:checked').value);
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

function getRestaurant(lat, lng, rad) {
    var apiURL = "http://localhost:8443/rrg";
    $.get(apiURL , { latitude: lat, longitude: lng, radius: parseInt(rad) }, function( data ) {
        var nm = document.getElementById("name");
        var addr = document.getElementById("address");
        var address = parseAddress(data.address);
        var mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
        document.getElementById("directions").href = mapsLink;
        // console.log(data);
        nm.innerHTML = data.name;
        addr.innerHTML = address;
    }, "json");
}