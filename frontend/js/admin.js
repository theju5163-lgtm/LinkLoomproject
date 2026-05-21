// LinkLoom Administrative Catalog Controller

const defaultAdminProducts = [
  { id: 1, name: "Traditional Pottery", price: 1999, category: "Pottery", rating: 4.5, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", discount: "15% OFF", description: "Handcrafted traditional clay pottery, custom throwed by artisan families using clay sourced from the banks of the River Ganges.", isFeatured: true },
  { id: 2, name: "Handmade Saree", price: 4999, category: "Clothes", rating: 4.8, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600", discount: "10% OFF", description: "An exquisite Banarasi silk saree, woven by hand with rich silver and gold threads over a month of dedicated master craftwork.", isFeatured: true },
  { id: 3, name: "Silver Jewelry", price: 2999, category: "Jewelry", rating: 4.7, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600", discount: "New", description: "Ornate silver neckpiece crafted by generational artisans in Rajasthan, showcasing vintage tribal motifs and raw stones.", isFeatured: false },
  { id: 4, name: "Handcarved Spoon Set", price: 799, category: "Handmade", rating: 4.6, image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600", discount: "Best Seller", description: "Ergonomic culinary spoons hand-carved from seasoned teak wood, featuring a rich olive oil polish that highlights pure grain textures.", isFeatured: true },
  { id: 5, name: "Handwoven Rug", price: 3499, category: "Handmade", rating: 4.9, image: "https://images.unsplash.com/photo-1595179997367-b09cf9123d24?w=600", discount: "20% OFF", description: "Premium wool floor rug, hand-knotted on looms using HSL curated pastel natural dyes. Adds visual warmth to any study or bedroom.", isFeatured: false },
  { id: 6, name: "Brass Antique Urn", price: 2499, category: "Jewelry", rating: 4.4, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600", discount: "Limited", description: "Traditional brass container styled with ancient geometric engravings. Polished by hand to achieve an exquisite golden luster.", isFeatured: false }
];

let products = JSON.parse(localStorage.getItem("products")) || defaultAdminProducts;
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(defaultAdminProducts));
}

function loadAdmin() {
  updateStats();
  loadTable();
  showSection("dashboard");
}

function showSection(id) {
  document.querySelectorAll(".section")
    .forEach(s => s.classList.add("hidden"));
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
  }
}

function addProduct() {
  const nameEl = document.getElementById("name");
  const priceEl = document.getElementById("price");
  const categoryEl = document.getElementById("category");
  const imageEl = document.getElementById("image");

  if (!nameEl || !priceEl || !categoryEl || !imageEl) {
    alert("Form fields are missing.");
    return;
  }

  const name = nameEl.value.trim();
  const price = Number(priceEl.value);
  const category = categoryEl.value.trim();
  const image = imageEl.value.trim() || "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600";

  if (name === "" || price <= 0 || category === "") {
    alert("Please fill in all details with valid inputs.");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    category,
    rating: 4.5,
    image,
    discount: "Artisan Choice",
    description: "Exclusive masterwork curated dynamically via the administration catalog panel. Expertly crafted."
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product Added successfully!");

  // Clear fields
  nameEl.value = "";
  priceEl.value = "";
  categoryEl.value = "";
  imageEl.value = "";

  updateStats();
  loadTable();
  showSection("products"); // return to list view
}

function loadTable() {
  let table = document.getElementById("productTable");
  if (!table) return;
  table.innerHTML = "";

  products.forEach(p => {
    table.innerHTML += `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>₹${p.price.toLocaleString()}</td>
        <td><span style="color: #CF9E28; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">${p.category}</span></td>
        <td>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product from the marketplace catalog?")) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    loadTable();
    updateStats();
  }
}

function updateStats() {
  const el = document.getElementById("totalProducts");
  if (el) el.innerText = products.length;
}

function logoutAdmin() {
  localStorage.removeItem("admin");
  window.location.href = "admin-login.html";
}