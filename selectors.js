var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [5],
    tooltips: wNumb({decimals: 0}),
    pips: {
        mode: 'values',
        values: [1, 5, 10, 15],
        density: 7
    },
    range: {
        'min': [1, 1],
        'max': [15]
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
    })

    return empty;
}

function uncheckPrices() {
    priceCheckboxes.forEach(function(cb) {
        if (cb != anyCheckbox)
            cb.checked = false;
    })
}