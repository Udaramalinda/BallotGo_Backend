const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = require('./candidate.model');

const Result = sequelize.define(
  'Result',
  {
    candidate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    total_vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'result',
    timestamps: false, // You can manage timestamps manually
  }
);

Result.belongsTo(Candidate, {
  foreignKey: 'candidate_id',
});

module.exports = Result;
