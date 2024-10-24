const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TempUser = sequelize.define(
  'TempUser',
  {
    identity_card_number: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    residence_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: 'temp_user',
    timestamps: true, // Adds createdAt timestamp
  }
);

module.exports = TempUser;
