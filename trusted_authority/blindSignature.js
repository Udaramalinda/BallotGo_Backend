const blindSignatures = require('blind-signatures');
const { key } = require('./authorityKeys');

const voteBlindSignature = async (blindedVote) => {
  const signedBlindedVote = blindSignatures.sign({
    blinded: blindedVote,
    key: {
      N: key.keyPair.n.toString(),
      d: key.keyPair.d.toString(),
    },
  });

  console.log('Signed Blinded Vote:', signedBlindedVote);
  return signedBlindedVote;
};

module.exports = { voteBlindSignature };
