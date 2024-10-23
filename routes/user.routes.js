const express = require('express');
const router = express.Router();
const { registerUser, verifyOtpAndRegisterPassword, loginUser } = require('../controller/user.controller');

// POST route to register a user
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtpAndRegisterPassword);
router.post('/login', loginUser);


module.exports = router;
