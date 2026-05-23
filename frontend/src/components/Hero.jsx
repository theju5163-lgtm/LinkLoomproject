function Hero() {
  return (
    <div
      style={{
        height: "300px",
        background:
          "linear-gradient(to right,#ff9966,#ff5e62)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "50px",
      }}
    >
      <h1>Discover Handmade Stories</h1>
      <p>Support local artisans across India</p>

      <button
        style={{
          width: "150px",
          padding: "10px",
          border: "none",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        Explore Now
      </button>
    </div>
  );
}

export default Hero;