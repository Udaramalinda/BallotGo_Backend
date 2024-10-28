const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TempOtp = sequelize.define(
  'TempOtp',
  {
    identity_card_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    otp_hash: {
      type: DataTypes.STRING(255), // Store the hashed OTP
      allowNull: false,
    },
    otp_expires_at: {
      type: DataTypes.DATE, // When the OTP will expire
      allowNull: false,
    },
  },
  {
    tableName: 'temp_otp',
    timestamps: true, // Adds createdAt timestamp
  }
);

module.exports = TempOtp;