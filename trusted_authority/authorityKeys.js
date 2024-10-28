const forge = require('node-forge');

const keypair = forge.pki.rsa.generateKeyPair(512);
const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
const privateKey = keypair.privateKey;


module.exports = { keypair, publicKeyPem, privateKey };
