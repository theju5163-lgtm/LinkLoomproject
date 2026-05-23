function ProductCard() {
  return (
    <div
      style={{
        width: "220px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        margin: "20px",
      }}
    >
      <img
        src="https://via.placeholder.com/200"
        alt="product"
        style={{ width: "100%" }}
      />

      <h3>Handmade Pottery</h3>

      <p>₹599</p>

      <button
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;