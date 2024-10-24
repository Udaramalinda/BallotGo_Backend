const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary
const User = require('./user.model'); // Import User model

const UserPassword = sequelize.define('UserPassword', {
  identity_card_number: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'identity_card_number',
    },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'USER',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_password',
  timestamps: false, // You can manage timestamps manually
});

// Establishing the one-to-one relationship
UserPassword.belongsTo(User, {
  foreignKey: 'identity_card_number',
  targetKey: 'identity_card_number',
});

module.exports = UserPassword;
