/***********************************************************************

PSEUDO CODE

1. populate table with data.json.
2. changing quantity should update
    - quantity number - not go below zero.
    - total price.
    - number of items selected
    - total of items selected.
    - if there is a condition met on one item
        - populate discounts part.
        - update total cost subtraction.
3. Bonus: On clicking checkout, reset state and show alert.
4. Remove console.log-s
5. Restructure with jQuery best practices
6. Split code into files, add task runner
7. Add tests to the project.
8. Add linter and css pre-processor
9. Move to FastShell structure

***********************************************************************/

$(document).ready(function() {
    console.log("ENTERED");

    $(".button").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
        $button.parent().parent().find(".shopping-cart__item__item-total").html(newVal * 5);
    });

    $.getJSON('data.json', function(data) {
        console.log(data ? "DATA LOADED" : "DATA NOT HERE");

        var output = '<ul>';
        $.each(data, function(key, val) {
            output += '<li>' + val.name + " " + val.price + '</li>';
        });
        output += '</ul>';
        $('.order-summary__discounts__item').html(output);
    });

    $('button.button--primary').on('click', function(event) {
        $('div h3').html('Save');
    })
});