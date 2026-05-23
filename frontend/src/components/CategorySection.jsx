function CategorySection() {
  const categories = [
    "🏺 Pottery",
    "🧵 Handloom",
    "💍 Jewelry",
    "🎨 Paintings",
    "🪵 Wood Craft",
    "🏠 Decor",
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2>Shop by Categories</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              background: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;