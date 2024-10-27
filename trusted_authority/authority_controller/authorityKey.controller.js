const e = require('express');
const { publicKey, privateKey } = require('../authorityKeys');

const requestKeys = async (req, res) => {
  res.status(200).json(publicKey);
};

module.exports = { requestKeys };
