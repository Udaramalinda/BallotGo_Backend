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

  admin: {
    admin_id: process.env.ADMIN_ID,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_role: process.env.ADMIN_ROLE,
    admin_name: process.env.ADMIN_NAME,
    admin_mobile_number: process.env.ADMIN_MOBILE_NUMBER,
    admin_residence_id: process.env.ADMIN_RESIDENCE_ID,
    admin_email: process.env.ADMIN_EMAIL,
    admin_date_of_birth: process.env.ADMIN_DATE_OF_BIRTH,

  },
};
