const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const User = sequelize.define(
  'User',
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
  },
  {
    tableName: 'user',
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = User;
