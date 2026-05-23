const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "User route working" });
});

module.exports = router;