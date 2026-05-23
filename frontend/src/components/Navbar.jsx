function Navbar() {
  return (
    <nav
      style={{
        background: "#131921",
        color: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Artisan Tale</h2>

      <input
        type="text"
        placeholder="Search handmade products..."
        style={{
          width: "40%",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
        }}
      />

      <div style={{ display: "flex", gap: "20px" }}>
        <span>Login</span>
        <span>Cart 🛒</span>
      </div>
    </nav>
  );
}

export default Navbar;