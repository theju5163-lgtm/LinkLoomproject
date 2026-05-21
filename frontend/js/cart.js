// LinkLoom Cart Controller

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your shopping bag is currently empty.</p>
        <button class="btn-primary" onclick="window.location.href='marketplace.html'" style="margin-top: 20px;">Discover Crafts</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "₹0";
    if (totalEl) totalEl.innerText = "₹0";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const qty = item.qty || 1;
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="details">
          <h3>${item.name}</h3>
          <span class="category-tag">${item.category}</span>
          <p class="unit-price">₹${item.price.toLocaleString()} each</p>
        </div>
        <div class="quantity">
          <button class="qty-btn" onclick="decreaseQty(${index})"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-val" id="qty-${index}">${qty}</span>
          <button class="qty-btn" onclick="increaseQty(${index})"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="price-section">
          <p class="total-price">₹${itemTotal.toLocaleString()}</p>
          <button class="remove-btn" onclick="removeItem(${index})"><i class="fa-solid fa-trash-can"></i> Remove</button>
        </div>
      </div>
    `;
  });

  const shipping = 150; // Flat premium delivery fee
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.innerText = "₹" + subtotal.toLocaleString();
  if (totalEl) totalEl.innerText = "₹" + total.toLocaleString();

  // Update cart count badge
  let count = 0;
  cart.forEach(item => {
    count += (item.qty || 1);
  });
  let countEl = document.getElementById("cartCount");
  if (countEl) countEl.innerText = count;
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].qty = (cart[index].qty || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    const currentQty = cart[index].qty || 1;
    if (currentQty > 1) {
      cart[index].qty = currentQty - 1;
    } else {
      cart.splice(index, 1); // remove if drops below 1
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Add products before checking out.");
    return;
  }
  window.location.href = "checkout.html";
}