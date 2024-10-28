const e = require('express');
const { publicKeyPem, privateKey } = require('../authorityKeys');

const requestKeys = async (req, res) => {
  res.status(200).json(publicKeyPem);
};

module.exports = { requestKeys };
