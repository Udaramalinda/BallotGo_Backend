const jwt = require("jsonwebtoken");
const { encryptData, generateEncryptionKey } = require("../crypto/encryption");

// Secret key for JWT token (should ideally be stored in environment variables)
const JWT_SECRET = "your_jwt_secret";

// User database (for demo purposes, this would be a real database in production)
const users = {};

// Registration (could also use encrypted data if necessary)
const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  if (users[email]) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  // Store the user securely (this is simplified; in a real scenario, password should be hashed)
  users[email] = { email, password };

  res.json({ success: true, message: "User registered successfully" });
};

// Login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  // Check if the user exists and the password matches
  if (!users[email] || users[email].password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Generate JWT token for the user
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ success: true, token });
};

// Verify JWT token (middleware function for protected routes)
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    // If token is valid, store the user's email for the next request
    req.email = decoded.email;
    next();
  });
};

// Request encryption key (optional if you want to integrate key-based auth)
const requestEncryptionKey = (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const encryptionKey = generateEncryptionKey();
  res.json({ success: true, encryption_key: encryptionKey });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  requestEncryptionKey,
};
