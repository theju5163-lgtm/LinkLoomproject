// LinkLoom Global Shared JS State & Cart Management

const defaultProductsList = [
  { id: 1, name: "Traditional Pottery", price: 1999, category: "Pottery", rating: 4.5, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", discount: "15% OFF", description: "Handcrafted traditional clay pottery, custom throwed by artisan families using clay sourced from the banks of the River Ganges.", isFeatured: true },
  { id: 2, name: "Handmade Saree", price: 4999, category: "Clothes", rating: 4.8, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600", discount: "10% OFF", description: "An exquisite Banarasi silk saree, woven by hand with rich silver and gold threads over a month of dedicated master craftwork.", isFeatured: true },
  { id: 3, name: "Silver Jewelry", price: 2999, category: "Jewelry", rating: 4.7, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600", discount: "New", description: "Ornate silver neckpiece crafted by generational artisans in Rajasthan, showcasing vintage tribal motifs and raw stones.", isFeatured: false },
  { id: 4, name: "Handcarved Spoon Set", price: 799, category: "Handmade", rating: 4.6, image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600", discount: "Best Seller", description: "Ergonomic culinary spoons hand-carved from seasoned teak wood, featuring a rich olive oil polish that highlights pure grain textures.", isFeatured: true },
  { id: 5, name: "Handwoven Rug", price: 3499, category: "Handmade", rating: 4.9, image: "https://images.unsplash.com/photo-1595179997367-b09cf9123d24?w=600", discount: "20% OFF", description: "Premium wool floor rug, hand-knotted on looms using HSL curated pastel natural dyes. Adds visual warmth to any study or bedroom.", isFeatured: false },
  { id: 6, name: "Brass Antique Urn", price: 2499, category: "Jewelry", rating: 4.4, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600", discount: "Limited", description: "Traditional brass container styled with ancient geometric engravings. Polished by hand to achieve an exquisite golden luster.", isFeatured: false }
];

let products = JSON.parse(localStorage.getItem("products")) || defaultProductsList;
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(defaultProductsList));
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

  let exists = cart.find(p => p.id === Number(id));
  if (!exists) {
    product.qty = 1;
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