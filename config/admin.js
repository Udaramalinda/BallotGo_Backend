const bcrypt = require('bcrypt');
const config = require('./config').admin;
const UserPassword = require('../models/userPassword.model');
const User = require('../models/user.model');

const createAdmin = async () => {
  try {
    await User.create({
      identity_card_number: config.admin_id,
      name: config.admin_id,
      mobile_number: config.admin_mobile_number,
      residence_id: config.admin_residence_id,
      email: config.admin_email,
      date_of_birth: config.admin_date_of_birth,
    });

    const hashedPassword = await bcrypt.hash(config.admin_password, 10);
    await UserPassword.create({
      identity_card_number: config.admin_id,
      password_hash: hashedPassword,
      role: config.admin_role,
    });
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = createAdmin;
