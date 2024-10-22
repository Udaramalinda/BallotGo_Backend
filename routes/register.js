const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  requestEncryptionKey,
  verifyToken,
} = require("../controllers/authController");

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Request encryption key route (optional)
router.post("/request-key", requestEncryptionKey);

// A protected route that requires JWT authentication
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome, ${req.email}! You have access to protected data.`,
  });
});

module.exports = router;
