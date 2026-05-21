// LinkLoom Products & Marketplace Manager

const defaultProducts = [
  { id: 1, name: "Traditional Pottery", price: 1999, category: "Pottery", rating: 4.5, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", discount: "15% OFF", isFeatured: true, isTrending: true },
  { id: 2, name: "Handmade Saree", price: 4999, category: "Clothes", rating: 4.8, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600", discount: "10% OFF", isFeatured: true, isTrending: false },
  { id: 3, name: "Silver Jewelry", price: 2999, category: "Jewelry", rating: 4.7, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600", discount: "New", isFeatured: false, isTrending: true },
  { id: 4, name: "Handcarved Spoon Set", price: 799, category: "Handmade", rating: 4.6, image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600", discount: "Best Seller", isFeatured: true, isTrending: true },
  { id: 5, name: "Handwoven Rug", price: 3499, category: "Handmade", rating: 4.9, image: "https://images.unsplash.com/photo-1595179997367-b09cf9123d24?w=600", discount: "20% OFF", isFeatured: false, isTrending: false },
  { id: 6, name: "Brass Antique Urn", price: 2499, category: "Jewelry", rating: 4.4, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600", discount: "Limited", isFeatured: false, isTrending: true }
];

// Initialize central localStorage key "products"
let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
}

function getProduct(id) {
  return products.find(p => p.id === Number(id));
}

function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product-details.html";
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = getProduct(id);
  if (!product) return;

  // Prevent duplicates
  let exists = cart.find(p => p.id === Number(id));
  if (!exists) {
    product.qty = 1; // set default quantity
    cart.push(product);
  } else {
    exists.qty = (exists.qty || 1) + 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Added to Cart 🛒");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach(item => {
    count += (item.qty || 1);
  });
  let el = document.getElementById("cartCount");
  if (el) el.innerText = count;
}

// Global Category selection
let currentCategory = "All";

function filterCategory(cat, btnElement) {
  currentCategory = cat;
  
  // Update button active state classes
  const buttons = document.querySelectorAll(".categories-bar button");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }

  searchProducts();
}

function searchProducts() {
  let val = document.getElementById("search").value.toLowerCase();
  
  let filtered = products;

  // Apply category filter
  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  // Apply search query
  if (val !== "") {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(val) || p.category.toLowerCase().includes(val));
  }

  render(filtered);
}

function render(list) {
  let container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="no-products"><i class="fa-solid fa-box-open"></i><p>No masterworks match your criteria.</p></div>`;
    return;
  }

  // Fetch wishlist
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  list.forEach(p => {
    const discountTag = p.discount ? `<span class="badge">${p.discount}</span>` : "";
    const isWished = wishlist.some(item => item.id === p.id) ? "active" : "";
    
    // Star generator
    let stars = "";
    const ratingVal = p.rating || 4.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingVal)) {
        stars += `<i class="fa-solid fa-star"></i>`;
      } else if (i - 0.5 <= ratingVal) {
        stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        stars += `<i class="fa-regular fa-star"></i>`;
      }
    }

    container.innerHTML += `
      <div class="card">
        <div class="img-container">
          <img src="${p.image}" alt="${p.name}" onclick="viewProduct(${p.id})">
          ${discountTag}
          <button class="wishlist-btn ${isWished}" onclick="toggleWishlist(${p.id}, this)">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-details">
          <span class="category-tag">${p.category}</span>
          <h3 onclick="viewProduct(${p.id})">${p.name}</h3>
          <div class="rating">
            <span class="stars">${stars}</span>
            <span class="rating-num">(${ratingVal})</span>
          </div>
          <div class="card-bottom">
            <span class="price">₹${p.price.toLocaleString()}</span>
            <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add</button>
          </div>
        </div>
      </div>
    `;
  });
}

function toggleWishlist(id, btnElement) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let product = getProduct(id);
  if (!product) return;

  const index = wishlist.findIndex(p => p.id === id);
  if (index === -1) {
    wishlist.push(product);
    btnElement.classList.add("active");
    showToast("Added to Wishlist ❤️");
  } else {
    wishlist.splice(index, 1);
    btnElement.classList.remove("active");
    showToast("Removed from Wishlist 💔");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Initial loader
function loadProducts() {
  products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
  render(products);
  updateCartCount();
}