const nodemailer = require('nodemailer');
const config = require('../config/config').gmail;

// Function to send OTP via email (using Nodemailer)
const sendOtpEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: config.email, // Or another email service provider
    auth: {
      user: config.ballotgo_email, // Add your email
      pass: config.ballotgo_password, // Add your email password
    },
  });

  await transporter.sendMail({
    from: '"BallotGo" <ballotgoevoting@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  });
};

module.exports = { sendOtpEmail };