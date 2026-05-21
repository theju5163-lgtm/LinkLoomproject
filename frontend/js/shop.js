const products=[

{

name:"Traditional Pottery",

price:1999,

category:"Pottery",

image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600"

},

{

name:"Handmade Saree",

price:4999,

category:"Textiles",

image:"https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600"

},

{

name:"Silver Jewelry",

price:2999,

category:"Jewelry",

image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600"

}

];


let cart=[];


function displayProducts(items){

let data="";

items.forEach(product=>{

data+=`

<div class="card">

<img src="${product.image}">

<h3>

${product.name}

</h3>

<p>

₹${product.price}

</p>

<button
onclick='addToCart()'>

Add to Cart

</button>

</div>

`;

});

document.getElementById(
"products"
).innerHTML=data;

}


displayProducts(products);


function filterProducts(){

let value=
document.getElementById(
"filter"
).value;

if(value==="all"){

displayProducts(products);

return;

}

let filtered=
products.filter(

p=>p.category===value

);

displayProducts(filtered);

}



function searchProduct(){

let value=
document.getElementById(
"search"
).value.toLowerCase();

let result=
products.filter(

p=>p.name
.toLowerCase()
.includes(value)

);

displayProducts(result);

}



function addToCart(){

cart.push("item");

document.getElementById(
"cartCount"
).innerHTML=
cart.length;

}