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

function getRating(rating) {
    switch(rating) {
        case 1:
            return "images/yelp/regular_1.png";
        case 1.5:
            return "images/yelp/regular_1_half.png";
        case 2:
            return "images/yelp/regular_2.png";
        case 2.5:
            return "images/yelp/regular_2_half.png";
        case 3:
            return "images/yelp/regular_3.png";
        case 3.5:
            return "images/yelp/regular_3_half.png";
        case 4:
            return "images/yelp/regular_4.png";
        case 4.5:
            return "images/yelp/regular_4_half.png";
        case 5:
            return "images/yelp/regular_5.png";
        default:
            return "images/yelp/regular_0.png";
    }
}

var apiURL = "https://yilongzhu.com:8443/rrg";
var nm = document.getElementById("name");
var addr = document.getElementById("address");
var dir = document.getElementById("directions");
var place = document.getElementById("place");
var url = document.getElementById("yelp-url");
var ratingImg = document.getElementById("rating").getElementsByTagName("img")[0];
var reviews = document.getElementById("rating").getElementsByTagName("span")[0];


function getRestaurant(lat, lng, rad, price) {
    $.get(apiURL , {latitude: lat, longitude: lng, radius: rad, price: price}, data => {
        var address = data.address.join(", ");
        var mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
        place.style.backgroundImage = "url(" + data.image_url + ")";
        nm.innerHTML = data.name;
        addr.innerHTML = address;
        dir.href = mapsLink;
        ratingImg.src = getRating(data.rating);
        reviews.innerHTML = data.review_count + " Reviews";
        url.href = data.url;
    }, "json");
}
