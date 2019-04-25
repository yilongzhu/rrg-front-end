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
    onChange: data => {range = data['from'];}
});

var priceCheckboxes = document.getElementById('price').querySelectorAll('input');
var anyCheckbox = document.getElementById('price-any');
priceCheckboxes.forEach(cb => {
    cb.addEventListener('click', () => {
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
    priceCheckboxes.forEach(cb => {
        if (cb.checked == true)
            empty = false;
    });

    return empty;
}

function uncheckPrices() {
    priceCheckboxes.forEach(cb => {
        if (cb != anyCheckbox)
            cb.checked = false;
    });
}