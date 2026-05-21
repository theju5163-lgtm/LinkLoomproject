// LinkLoom Checkout Process

function loadCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkoutItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p style="color: #7A695E; text-align: center; padding: 20px;">Your shopping bag is empty.</p>`;
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const qty = item.qty || 1;
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="summary-item">
        <span class="item-name">${item.name} <strong>x${qty}</strong></span>
        <span class="item-price">₹${itemTotal.toLocaleString()}</span>
      </div>
    `;
  });

  const shipping = 150;
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.innerText = "₹" + subtotal.toLocaleString();
  if (totalEl) totalEl.innerText = "₹" + total.toLocaleString();
}

function placeOrder() {
  const nameEl = document.getElementById("name");
  const phoneEl = document.getElementById("phone");
  const addressEl = document.getElementById("address");
  const cityEl = document.getElementById("city");
  const pincodeEl = document.getElementById("pincode");

  if (!nameEl || !phoneEl || !addressEl || !cityEl || !pincodeEl) {
    alert("Checkout form elements are missing.");
    return;
  }

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const address = addressEl.value.trim();
  const city = cityEl.value.trim();
  const pincode = pincodeEl.value.trim();

  // Validation
  if (name === "" || phone === "" || address === "" || city === "" || pincode === "") {
    alert("Please fill in all delivery details.");
    return;
  }

  if (phone.length < 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (pincode.length < 6) {
    alert("Please enter a valid pincode.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cannot place order. Your shopping cart is empty.");
    return;
  }

  // Calculate order totals
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * (item.qty || 1);
  });
  const shipping = 150;
  const total = subtotal + shipping;

  // Retrieve existing orders
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Create new order record
  const newOrder = {
    id: "LL-" + Date.now().toString().substring(6),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: cart,
    subtotal: subtotal,
    total: total,
    status: "Placed",
    shipping: { name, phone, address, city, pincode }
  };

  orders.unshift(newOrder); // Add to beginning of history
  localStorage.setItem("orders", JSON.stringify(orders));

  // Set order status indicator
  localStorage.setItem("orderStatus", "Placed");

  // Clear shopping bag
  localStorage.removeItem("cart");

  alert("Order Placed Successfully!");
  window.location.href = "success.html";
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  loadCheckoutSummary();
});