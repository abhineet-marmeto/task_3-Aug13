// // Example JSON Data
// const jsonData = {
//   "checkout_id": "QVL5HADD5",
//   "created_at": "2024-08-13T12:34:56Z",
//   "customer": {
//     "customer_id": "123456",
//     "first_name": "TEST",
//     "last_name": "TEST",
//     "email": "rishabh@marmeto.com",
//     "phone": "+1234567890"
//   },
//   "cart": {
//     "items": [
//       {
//         "item_id": "prod_001",
//         "product_name": "Y-Wrench",
//         "quantity": 1,
//         "price": 900.00,
//         "discount": {
//           "type": "percentage",
//           "value": 10,
//           "applied_value": 90.00
//         },
//         "tax": {
//           "type": "percentage",
//           "value": 18,
//           "applied_value": 162.05
//         },
//         "total_price": 900.00,
//         "image_link": "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha"
//       }
//     ],
//     "sub_total": 900.00,
//     "total_discount": 90.00,
//     "total_tax": 162.05,
//     "shipping_cost": 0,
//     "grand_total": 1062.05
//   }
// };

// // Function to load confirmation details
// function loadConfirmationDetails() {
//   // Update customer name
//   document.getElementById('customerName').textContent = `${jsonData.customer.first_name} ${jsonData.customer.last_name}`;

//   // Update confirmation ID
//   document.getElementById('confirmationId').textContent = jsonData.checkout_id;

//   // Update customer email
//   document.getElementById('customerEmail').textContent = jsonData.customer.email;

//   // Update shipping address
//   document.getElementById('shippingAddress').innerHTML = `
//         ${jsonData.customer.first_name} ${jsonData.customer.last_name}<br>
//         Delhi, 110075<br>
//         Delhi DL, India<br>
//         ${jsonData.customer.phone}
//     `;

//   // Update payment method with total amount
//   document.getElementById('paymentMethod').textContent = `Card - ₹${jsonData.cart.grand_total.toFixed(2)}`;

//   // Update order summary
//   document.getElementById('grandTotalSummary').textContent = jsonData.cart.grand_total.toFixed(2);
// }

// // Load confirmation details on page load
// document.addEventListener('DOMContentLoaded', loadConfirmationDetails);


document.addEventListener('DOMContentLoaded', function () {
  // Retrieve order data from localStorage
  const orderData = JSON.parse(localStorage.getItem('orderData'));
  console.log(orderData)
  if (orderData) {

    //populating Items in list
    const product_list = document.querySelector("#product-list")
    orderData.cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('flex', 'justify-between', 'mb-4', 'items-center', 'w-full');
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

      product_list.appendChild(itemElement)
    });

    // Sub total
    document.getElementById('sub_total').textContent = `$${orderData.cart.sub_total}`;

    // shipping charges
    document.getElementById('shipping_charge').textContent = `$${orderData.cart.shipping_cost}`;

    // taxes
    document.getElementById('taxes').textContent = `$${orderData.cart.total_tax}`;

    // taxes
    document.getElementById('grand_total').textContent = `$${orderData.cart.grand_total}`;

    // discount
    document.getElementById('discount').textContent = `$${orderData.cart.total_discount}`;

    // Update customer name
    document.getElementById('customerName').textContent = `${orderData.customer.first_name}`;

    // Update confirmation ID
    document.getElementById('confirmationId').textContent = orderData.checkout_id;

    // Update customer email
    document.getElementById('customerEmail').textContent = orderData.customer.email;

    // Update shipping address
    document.getElementById('shippingAddress').innerHTML = `
          ${orderData.customer.first_name} ${orderData.customer.last_name}<br>
          Delhi, 110075<br>
          Delhi DL, India<br>
          ${orderData.customer.phone}
      `;

    // Update payment method with total amount
    document.getElementById('paymentMethod').textContent = `${orderData.payment_mode} - ₹${orderData.cart.grand_total.toFixed(2)}`;

    // // Update order summary
    // document.getElementById('grandTotalSummary').textContent = orderData.cart.grand_total.toFixed(2);
  } else {
    // Handle case where order data is not available
    console.error('No order data found');
  }
});