const nodemailer = require('nodemailer');
const config = require('../config/config').gmail;

// Function to send OTP via email (using Nodemailer)
const sendVerificationCodeEmail = async (email, verificationCode) => {
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
    subject: 'Your vote verification Code',
    text: `Your vote verification code is ${verificationCode}. This can be used to verify your vote.`,
  });
};

const sendLoginConfirmation = async (email) => {
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
      subject: 'Your are logged in to BallotGo',
      text: `You have successfully logged in to BallotGo. If this was not you, please contact us immediately.`,
    });
  };

module.exports = { sendVerificationCodeEmail, sendLoginConfirmation };