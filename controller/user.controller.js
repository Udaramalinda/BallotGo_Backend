const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config').jwt;
const { sendOtpEmail } = require('../utils/otp.service');
const { publicKeyPem } = require('../trusted_authority/authorityKeys');
const { sendLoginConfirmation } = require('../utils/email.service');

const User = require('../models/user.model');
const UserPassword = require('../models/userPassword.model');
const TempUser = require('../models/tempUser.model');

// Function to generate a random OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

// Controller to handle user registration (without password)
const registerUser = async (req, res) => {
  const {
    identity_card_number,
    name,
    mobile_number,
    residence_id,
    email,
    date_of_birth,
  } = req.body;
  const otp = generateOTP();

  try {
    // Hash the OTP before saving it to the database
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save user data (without password) in TempUser table with OTP and expiration time
    await TempUser.create({
      identity_card_number,
      name,
      mobile_number,
      residence_id,
      email,
      date_of_birth,
      otp_hash: hashedOtp,
      otp_expires_at: new Date(Date.now() + 5 * 60 * 1000), // OTP expires in 5 minutes
    });

    // Send OTP to the user's email
    await sendOtpEmail(email, otp);

    res
      .status(200)
      .json({ message: 'OTP sent to your email. Please verify to continue.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle OTP verification and password registration
const verifyOtpAndRegisterPassword = async (req, res) => {
  const { identity_card_number, otp, password } = req.body;

  try {
    // Find the user in the TempUser table
    const tempUser = await TempUser.findOne({
      where: { identity_card_number },
    });

    if (!tempUser) {
      return res
        .status(400)
        .json({ message: 'User not found or OTP expired.' });
    }

    // Check if OTP has expired
    if (new Date() > tempUser.otp_expires_at) {
      await TempUser.destroy({ where: { identity_card_number } }); // Remove expired tempUser
      return res
        .status(400)
        .json({ message: 'OTP has expired. Please register again.' });
    }

    // Verify the OTP
    const isOtpValid = await bcrypt.compare(otp, tempUser.otp_hash);
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // OTP is valid, proceed to create user and password
    const user = await User.create({
      identity_card_number: tempUser.identity_card_number,
      name: tempUser.name,
      mobile_number: tempUser.mobile_number,
      residence_id: tempUser.residence_id,
      email: tempUser.email,
      date_of_birth: tempUser.date_of_birth,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserPassword.create({
      identity_card_number: user.identity_card_number,
      password_hash: hashedPassword,
    });

    // Remove the tempUser after successful registration
    await TempUser.destroy({ where: { identity_card_number } });

    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { identity_card_number, password } = req.body;

  try {
    // Find the user in the UserPassword table
    const userPassword = await UserPassword.findOne({
      where: { identity_card_number },
    });

    if (!userPassword) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      password,
      userPassword.password_hash
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Password is valid, generate JWT token
    const token = jwt.sign(
      { username: identity_card_number, role: userPassword.role },
      config.jwt_secret,
      { expiresIn: '1h' }
    );

    // Send login confirmation email
    const user = await User.findOne({
      where: { identity_card_number },
    });
    await sendLoginConfirmation(user.email);

    res.status(200).json({ message: 'Login successful!', token, publicKeyPem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, verifyOtpAndRegisterPassword, loginUser };
