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

$(document).ready(function () {

	// GENERATING TABLE
	$.getJSON('data.json', function (data) {
		// TODO: take out data destructuring?

		if (data) {
			var output = '';

			output += `
				<div class="shopping-cart__header">
					<div>Product Details</div>
					<div class="shopping-cart__header__sub">
						<div>Quantity</div>
						<div>Price</div>
						<div>Total</div>
					</div>
				</div>
			`;


			$.each(data, function (key, val) {
				output += `
						<div class="shopping-cart__item">
							<img class="shopping-cart__item__image" src="${val.image}" alt=""></img>
							<div class="shopping-cart__item__title">${val.name}</div>
							<div class="shopping-cart__product-code">${val.code}</div>
							<div class="form">
								<button class="button button--decrement">-</button>
								<input type="text" name="amount-input" id="amount-input-${key}" value="0">
								<button class="button button--increment">+</button>
							</div>
							<div class="shopping-cart__item__item-price">${val.price}</div>
							<div class="shopping-cart__item__item-total">0</div>
					</div>
					`;
			});

			$('.shopping-cart__body').html(output);
		}
	});

	// HANDLE DISCOUNTS
	function discount(handleOrNOt) {
		// TODO: add discount handling
		if (handleOrNOt) {
			var output = '';

			output += '<h3>discounts</h3>'
			output += '<div class="order-summary__discounts__item">'
			output += '	<div class="discount-title">Goku Pop offer</div>'
			output += '<div class="discount-amount">-5 E</div>'
			output += `</div>`


			$('.order-summary__discounts').html(output);

		}
	}

	// CHOOSING AMOUNT
	$('.shopping-cart__body').on('click', 'button.button', function (event) {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		var price = $button.parent().parent().find('.shopping-cart__item__item-price').text();
		price = parseFloat(price)


		if ($button.text() == '+') {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
		$button.parent().parent().find('.shopping-cart__item__item-total').html(newVal * price);

		// TODO: 1. Add amount updates - 2. abstract away in function
		$('.amount').html(price);
		$('.subtitle').html(price);
		$('.subtitle-amount').html(price);

		// TODO: Add discount calling logic
		discount(false);
	});

	$('button.button--primary').on('click', function (event) {
		$('.shopping-cart__item__item-total').html(0);
		$('.amount').html(0);
		$('.subtitle').html(0);
		$('.subtitle-amount').html(0);
		$('input').val(0);

		// TODO: Add summary resets here
	});

	// CHECKOUT RESET
	$('button.button--primary').on('click', function (event) {
		$('.shopping-cart__item__item-total').html(0);
		$('.amount').html(0);
		$('.subtitle').html(0);
		$('.subtitle-amount').html(0);
		$('input').val(0);

		// TODO: Add summary resets here
	});
});
