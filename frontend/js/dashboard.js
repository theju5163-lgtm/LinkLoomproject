// LinkLoom Dashboard Controller

function counter(id, start, end, speed) {
  let count = start;
  let element = document.getElementById(id);
  if (!element) return;
  
  let step = Math.ceil(end / 100);
  
  let interval = setInterval(() => {
    count += step;
    if (count >= end) {
      count = end;
      clearInterval(interval);
    }
    element.innerHTML = count.toLocaleString('en-IN');
  }, speed);
}

// Initialise Counters
window.addEventListener('DOMContentLoaded', () => {
  // Stats counts
  counter("revenue", 0, 1428208, 20);
  counter("orders", 0, 991, 30);
  counter("artisans", 0, 126, 40);

  // Load dynamic lists
  loadDashboardProducts();
  loadOrderHistory();
});

// Load products in Dashboard
function loadDashboardProducts() {
  const productsList = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("dashboardProducts");
  if (!container) return;

  container.innerHTML = "";

  if (productsList.length === 0) {
    container.innerHTML = `<p style="color: #7A695E; grid-column: 1/-1; text-align: center; padding: 20px;">No products in database.</p>`;
    return;
  }

  // Display first 3 products
  productsList.slice(0, 3).forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price.toLocaleString()}</p>
        <button onclick="viewProduct(${p.id})">View Details</button>
      </div>
    `;
  });
}

// Helper to view product detail from Dashboard
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product-details.html";
}

// Load dynamic orders history from localStorage
function loadOrderHistory() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const container = document.getElementById("orderHistoryContainer");
  if (!container) return;

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="no-orders">
        <p>No recent orders found.</p>
        <button onclick="window.location.href='marketplace.html'" class="btn-shop">Start Shopping</button>
      </div>
    `;
    return;
  }

  // Render recent 3 orders
  orders.slice(0, 3).forEach(order => {
    const itemNames = order.items.map(item => `${item.name} (x${item.qty || 1})`).join(", ");
    
    container.innerHTML += `
      <div class="order-row">
        <div class="order-meta">
          <span class="order-id">#${order.id}</span>
          <span class="order-date">${order.date}</span>
        </div>
        <div class="order-items-desc" title="${itemNames}">
          ${itemNames}
        </div>
        <div class="order-total-price">
          ₹${order.total.toLocaleString()}
        </div>
        <div class="order-status-badge ${order.status.toLowerCase()}">
          ${order.status}
        </div>
      </div>
    `;
  });
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}