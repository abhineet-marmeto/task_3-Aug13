// Example JSON Data
const jsonData = {
  "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
  "created_at": "2024-08-13T12:34:56Z",
  "customer": {
    "customer_id": "123456",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  },
  "cart": {
    "items": [
      {
        "item_id": "prod_001",
        "product_name": "Wireless Headphones",
        "quantity": 2,
        "price": 99.99,
        "discount": {
          "type": "percentage",
          "value": 10,
          "applied_value": 19.998
        },
        "tax": {
          "type": "percentage",
          "value": 8.875,
          "applied_value": 14.135
        },
        "total_price": 194.122,
        "image_link": "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha"
      },
      {
        "item_id": "prod_002",
        "product_name": "Bluetooth Speaker",
        "quantity": 1,
        "price": 149.99,
        "discount": {
          "type": "fixed",
          "value": 20.00,
          "applied_value": 20.00
        },
        "tax": {
          "type": "percentage",
          "value": 8.875,
          "applied_value": 11.496
        },
        "total_price": 141.486,
        "image_link": "https://m.media-amazon.com/images/I/614pmXRPMFL._AC_UF1000,1000_QL80_.jpg"
      }
    ],
    "sub_total": 294.991,
    "total_discount": 39.998,
    "total_tax": 25.631,
    "shipping_cost": 15.00,
    "grand_total": 295.624,
    "payment_mode": "Card"
  }
};


// Function to load order summary
function loadOrderSummary() {
  const orderSummary = document.getElementById('orderSummary');
  const grandTotal = document.getElementById('grandTotal');
  const grandTotalSummary = document.getElementById('grandTotalSummary');
  const totalTax = document.getElementById('totalTax');
  // console.log("up: ", totalTax)
  orderSummary.innerHTML = '';

  jsonData.cart.items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('flex', 'justify-between', 'mb-4', 'items-center');
    itemElement.innerHTML = `
      <div class="flex items-center">
        <img src="${item.image_link}" alt="${item.product_name}" class="w-16 h-16 object-cover border-2 rounded-md mr-4">
        <div>
          <span>${item.product_name}</span>
          <div class="text-sm text-gray-500">$${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div>
        <span>$${item.total_price.toFixed(2)}</span>
        <div class="text-sm text-gray-500">Qty: ${item.quantity}</div>
      </div>
    `;
    orderSummary.appendChild(itemElement);
  });

  const discountBox = document.createElement("div");
  discountBox.classList.add("mb-4");
  discountBox.innerHTML = `
    <div class="border-t my-4"></div>
    <label class="block text-gray-700">Gift or discount coupon</label>
    <div class="flex mt-2">
      <input type="text" id="discountCode" class="w-full p-2 border rounded-md" placeholder="Enter code">
      <button class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-2">Apply</button>
    </div>
  `;
  orderSummary.appendChild(discountBox);

  const subTotalElement = document.createElement('div');
  subTotalElement.classList.add('flex', 'justify-between', 'mt-4', 'border-t', 'pt-2');
  subTotalElement.innerHTML = `
    <span>Subtotal</span>
    <span>$${jsonData.cart.sub_total.toFixed(2)}</span>
  `;
  orderSummary.appendChild(subTotalElement);

  const discountElement = document.createElement('div');
  discountElement.classList.add('flex', 'justify-between', 'mt-2');
  discountElement.innerHTML = `
    <span>Discount</span>
    <span>-$${jsonData.cart.total_discount.toFixed(2)}</span>
  `;
  orderSummary.appendChild(discountElement);

  const shippingElement = document.createElement('div');
  shippingElement.classList.add('flex', 'justify-between', 'mt-2');
  shippingElement.innerHTML = `
    <span>Shipping</span>
    <span>$${jsonData.cart.shipping_cost.toFixed(2)}</span>
  `;
  orderSummary.appendChild(shippingElement);


  const divider = document.createElement("div")
  divider.classList.add("border-t", "my-4")
  orderSummary.appendChild(divider)

  const totalElement = document.createElement('div');
  totalElement.classList.add('flex', 'justify-between', 'mt-4', 'text-lg', 'font-bold');
  totalElement.innerHTML = `

        <span>Total</span>
        <span>$${jsonData.cart.grand_total.toFixed(2)}</span>
        `;
  orderSummary.appendChild(totalElement);

  const totalTaxElement = document.createElement('div');
  totalTaxElement.classList.add('text-xs', 'text-gray-400');
  totalTaxElement.innerHTML = `
            Including $${jsonData.cart.total_tax.toFixed(2)} in taxes.
            `;
  orderSummary.appendChild(totalTaxElement);

  grandTotal.textContent = jsonData.cart.grand_total.toFixed(2);
}

// Function to switch between payment forms
function switchPaymentMethod() {
  const cardPaymentForm = document.getElementById('cardPaymentForm');
  const codForm = document.getElementById('codForm');
  const paymentMethods = document.getElementsByName('paymentMethod');

  paymentMethods.forEach(method => {
    method.addEventListener('change', function () {
      if (this.value === 'card') {
        cardPaymentForm.classList.remove('hidden');
        codForm.classList.add('hidden');
      } else {
        cardPaymentForm.classList.add('hidden');
        codForm.classList.remove('hidden');
      }
    });
  });
}


function validateCardDetails() {
  const cardNumber = document.getElementById('cardNumber').value;
  const expirationDate = document.getElementById('expirationDate').value;
  const cvv = document.getElementById('cvv').value;
  const currentYear = (new Date().getFullYear() % 100);
  const currentMonth = new Date().getMonth() + 1;

  // console.log("curryear: ", currentYear)

  // Card number validation
  if (!/^\d{16}$/.test(cardNumber)) {
    showErrorMessage("cardNumber", "Enter Valid Card details")
    return false;
  }

  // Expiration date validation
  const [expMonth, expYear] = expirationDate.split('/');
  if ((!expMonth || !expYear) || (expMonth < 1 || expMonth > 12) && (expYear < currentYear || expYear == currentYear) && (expMonth < currentMonth)) {
    showErrorMessage("expirationDate", 'Enter valid Expiration date');
    return false;
  }

  // CVV validation
  if (!/^\d{3}$/.test(cvv)) {
    showErrorMessage("cvv", 'Enter valid CVV');
    return false;
  }

  return true;
}

function showErrorMessage(id, message) {
  // console.log(id, message)
  document.querySelectorAll("#error_message").forEach(error => error.classList.add("hidden"))
  const errorContainer = document.createElement("span")
  errorContainer.classList.add("text-red-500", "text-sm");
  errorContainer.id = "error_message";
  errorContainer.textContent = `*${message}*`;
  // console.log(errorContainer)
  document.getElementById(id).after(errorContainer);
}

// Function to save card details to session storage
function saveCardDetails() {
  const cardNumber = document.getElementById('cardNumber').value;
  const expirationDate = document.getElementById('expirationDate').value;
  const cvv = document.getElementById('cvv').value;

  if (document.getElementById('saveCard').checked) {
    sessionStorage.setItem('cardNumber', cardNumber);
    sessionStorage.setItem('expirationDate', expirationDate);
    sessionStorage.setItem('cvv', cvv);
  }
}

// Function to load saved card details from session storage
function loadSavedCardDetails() {
  const savedCardNumber = sessionStorage.getItem('cardNumber');
  const savedExpirationDate = sessionStorage.getItem('expirationDate');
  const savedCvv = sessionStorage.getItem('cvv');

  if (savedCardNumber && savedExpirationDate && savedCvv) {
    document.getElementById('cardNumber').value = savedCardNumber;
    document.getElementById('expirationDate').value = savedExpirationDate;
    document.getElementById('cvv').value = savedCvv;
    document.getElementById('saveCard').checked = true;
  }
}


// Event listener for Pay button
document.getElementById('payButton').addEventListener('click', function () {
  // alert(`Payment of $${jsonData.cart.grand_total.toFixed(2)} successful!`);
  if (validateCardDetails()) {
    jsonData.payment_mode = "Card";
    localStorage.setItem('orderData', JSON.stringify(jsonData));
    // console.log(this)
    window.location.href = `https://abhineet-marmeto.github.io/task_3-Aug13/confirmationPage.html`
  }
});

// Event listener for Place Order button
document.getElementById('placeOrderButton').addEventListener('click', function () {
  // alert(`Payment of $${jsonData.cart.grand_total.toFixed(2)} successful!`);
  jsonData.payment_mode = "Cash on Delivery"
  localStorage.setItem('orderData', JSON.stringify(jsonData));

  // window.location.href = "http://localhost:5500/confirmationPage.html"
  window.location.href = "https://abhineet-marmeto.github.io/task_3-Aug13/confirmationPage.html"
});


// Load order summary on page load
document.addEventListener('DOMContentLoaded', function () {
  loadOrderSummary();
  switchPaymentMethod();
});
