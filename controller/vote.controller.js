const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/otp.service');

const User = require('../models/user.model');
const TempOtp = require('../models/otp.model');
const Candidate = require('../models/candidate.model');

// Function to generate a random OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const getUserId = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token
  const decoded = jwt.decode(token);
  return decoded.username;
};

const requestOtpToVote = async (req, res) => {
  const identity_card_number = getUserId(req);
  const otp = generateOTP();

  try {
    const user = await User.findOne({ where: { identity_card_number } });

    await sendOtpEmail(user.email, otp);

    const hashedOtp = await bcrypt.hash(otp, 10);

    await TempOtp.create({
      identity_card_number,
      otp_hash: hashedOtp,
      otp_expires_at: new Date(Date.now() + 5 * 60 * 1000), // OTP expires in 5 minutes
    });

    res.status(200).json({
      message: 'OTP sent to your email. Please verify to continue.',
      send: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyOtpAndSendCandidateList = async (req, res) => {
  const identity_card_number = getUserId(req);
  const { otp } = req.body;

  try {
    const otpData = await TempOtp.findOne({
      where: { identity_card_number },
      order: [['createdAt', 'DESC']],
    });

    if (!otpData) {
      return res.status(404).json({ error: 'OTP not found' });
    }

    const isValid = await bcrypt.compare(otp, otpData.otp_hash);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    if (new Date() > otpData.otp_expires_at) {
      await TempOtp.destroy({ where: { identity_card_number } });
      return res.status(401).json({ error: 'OTP has expired' });
    }

    const candidates = await Candidate.findAll();
    await TempOtp.destroy({ where: { identity_card_number } });

    // Send the list of candidates to the user
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requestOtpToVote, verifyOtpAndSendCandidateList };
