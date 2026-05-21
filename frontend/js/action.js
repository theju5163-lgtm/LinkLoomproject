function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = getProduct(id);

if(!product) return;

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart");
}