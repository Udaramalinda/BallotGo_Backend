const forge = require('node-forge');
const { keypair, publicKeyPem, privateKey } = require('./authorityKeys');

const voteBlindSignature = async (blindedVote) => {
  const md = forge.md.sha256.create();
  md.update(blindedVote, 'hex');
  const signature = privateKey.sign(md);
  const signatureHex = forge.util.bytesToHex(signature);

  return signatureHex;
};

module.exports = { voteBlindSignature };
