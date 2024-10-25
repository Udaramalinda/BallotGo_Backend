const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = require('./candidate.model');

const Election = sequelize.define(
  'Election',
  {
    election_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'election',
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

Candidate.belongsToMany(Election, {
  through: 'ElectionCandidate', // The name of the join table
  foreignKey: 'candidate_id', // Foreign key for Candidate
  otherKey: 'election_id', // Foreign key for Election
});

Election.belongsToMany(Candidate, {
  through: 'ElectionCandidate',
  foreignKey: 'election_id', // Foreign key for Election
  otherKey: 'candidate_id', // Foreign key for Candidate
});

module.exports = Election;
