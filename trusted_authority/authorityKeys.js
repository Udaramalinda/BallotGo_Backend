const NodeRSA = require('node-rsa');

// Generate RSA key pair
const key = new NodeRSA({b: 512});
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

module.exports = { key, publicKey, privateKey };