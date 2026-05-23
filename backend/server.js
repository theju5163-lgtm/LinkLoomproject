const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// DB
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes.js");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.post("/test", (req, res) => {
  res.json({ message: "POST working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});