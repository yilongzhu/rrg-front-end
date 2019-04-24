var range = 5;
$("#distance input").ionRangeSlider({
    skin: 'round',
    min: 1,
    max: 15,
    from: 5,
    step: 1,
    grid: true,
    grid_num: 7,
    force_edges: true,
    postfix: ' mile(s)',
    onChange: function (data) {
        range = data['from'];
        console.log(range);
    }
});

var priceCheckboxes = document.getElementById('price').querySelectorAll('input');
var anyCheckbox = document.getElementById('price-any');
priceCheckboxes.forEach(function(cb) {
    cb.addEventListener('click', function() {
        if (isEmpty()) {
            anyCheckbox.checked = true;
        } else if (cb != anyCheckbox && cb.checked == true) {
            anyCheckbox.checked = false;
        } else if (cb == anyCheckbox && anyCheckbox.checked == true) {
            uncheckPrices();
        }
    });
});

function isEmpty() {
    var empty = true;
    priceCheckboxes.forEach(function(cb) {
        if (cb.checked == true)
            empty = false;
    });

    return empty;
}

function uncheckPrices() {
    priceCheckboxes.forEach(function(cb) {
        if (cb != anyCheckbox)
            cb.checked = false;
    });
}