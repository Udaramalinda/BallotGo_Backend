const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = sequelize.define(
  'Candidate',
  {
    candidate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'candidate',
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = Candidate;
