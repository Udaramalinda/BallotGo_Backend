// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // ssl: true,
  },

  gmail: {
    email: process.env.EMAIL,
    ballotgo_email: process.env.BALLOTGO_EMAIL,
    ballotgo_password: process.env.BALLOTGO_EMAIL_PASSWORD,
  },

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
  },
};
