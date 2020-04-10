// IGNORE
// function openForm() {
//   document.getElementById("reserveForm").style.display = "block";
// }
// function closeForm() {
//   document.getElementById("reserveForm").style.display = "none";
// }

// function validateForm() {
//   var x = document.forms["reservation-form"]["cName"].value;
//   if (x == "") {
//     alert("Please provide your name");
//     return false;
//   }
// } 

// CHECKOUT FORM JS - disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())

// CHECKOUT FORM JS //

// ORDER PAGE JS

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  // console.log(removeCartItemButtons)
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// function purchaseClicked() {
//   alert('Thanks for your order. Please proceed to Checkout page')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   while (cartItems.hasChildNodes()) {
//     cartItems.removeChild(cartItems.firstChild)
//   }
//   updateCartTotal()
// }

// Trial 1: Go to checkout page only if something is in the cart

// function purchaseClicked() {
//   alert('Thanks for your order. Please proceed to Checkout page')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   if (cartItems.hasChildNodes())
//    {
//     document.location.href = "checkout.html";
//   } else {
//     alert('Please select items to order');
//     }
// }

// Trial 2:

// function purchaseClicked() {
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   if (cartItems = "") {
//     alert('Please select items to order');
//   } else {
//     document.location.href = "checkout.html";
//   }
// }

// Trial 3:

// function purchaseClicked(){
// if (document.getElementsByClassName('cart-items')[0].hasChildNodes()){
//   alert('Thanks for your order. Please proceed to Checkout page')
//   document.location.href = "checkout.html";
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//   while (cartItems.hasChildNodes()) {
//       cartItems.removeChild(cartItems.firstChild)     
//   }
// }   
// else {
//   alert("There is nothing in your cart!");
//   }
// }

// Trial 4:

function purchaseClicked() {
  var cartItems = document.getElementsByClassName('cart-items')[0]
  if (cartItems.hasChildNodes())
  document.location.href = "checkout.html";
  else {
    document.getElementsByClassName('btn-purchase').disabled = true;
  }
}


function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  cartRow.innerText = title
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }
  var cartRowContents = `
  <div class="cart-item cart-column">
                  <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                  <span class="cart-item-title">${title}</span>
              </div>
              <span class="cart-price cart-column">${price}</span>
              <div class="cart-quantity cart-column">
                  <input class="cart-quantity-input" type="number" value="1">
                  <button class="btn btn-danger" type="button">REMOVE</button>
              </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('£', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}
