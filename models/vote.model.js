const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = require('./candidate.model');

const Vote = sequelize.define(
  'Vote',
  {
    vote_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'vote',
    timestamps: false, // You can manage timestamps manually
  }
);

Candidate.hasMany(Vote, {
  foreignKey: 'candidate_id',
});
Vote.belongsTo(Candidate, {
  foreignKey: 'candidate_id',
});

module.exports = Vote;
