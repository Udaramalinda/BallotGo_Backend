const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user.model');

const UserVoteCheck = sequelize.define(
  'UserVoteCheck',
  {
    identity_card_number: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    vote_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'user_vote_check',
    timestamps: false, // You can manage timestamps manually
  }
);

UserVoteCheck.belongsTo(User, {
  foreignKey: 'identity_card_number',
  targetKey: 'identity_card_number',
});

module.exports = UserVoteCheck;
