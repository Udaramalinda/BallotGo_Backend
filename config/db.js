const { Sequelize } = require('sequelize');
const config = require('./config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  // dialectOptions: {
  //   ssl: { require: true, rejectUnauthorized: false },
  // },
});

module.exports = sequelize;
