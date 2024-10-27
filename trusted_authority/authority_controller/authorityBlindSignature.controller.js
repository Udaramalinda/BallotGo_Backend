const jwt = require('jsonwebtoken');
const config = require('../../config/config').jwt;
const { voteBlindSignature } = require('../blindSignature');
const { sendVerificationCodeEmail } = require('../../utils/email.service');

const UserVoteCheck = require('../../models/userVoteCheck.model');
const Vote = require('../../models/vote.model');
const User = require('../../models/user.model');

const getUserId = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token
  const decoded = jwt.decode(token);
  return decoded.username;
};

const createToken = (identity_card_number) => {
  return jwt.sign({ username: identity_card_number }, config.jwt_secret);
};

const submitVote = async (req, res) => {
  const { blindedVote } = req.body;

  try {
    const signature = await voteBlindSignature(blindedVote);

    res.status(200).json({ signature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const storeVerifiedVote = async (req, res) => {
  const identity_card_number = getUserId(req);
  const { candidate_id, signature } = req.body;

  try {
    const userVoteCheck = await UserVoteCheck.findOne({
      where: { identity_card_number },
    });

    if (userVoteCheck) {
      if (userVoteCheck.vote_status) {
        return res.status(400).json({ error: 'User has already voted' });
      }
    }
    await Vote.create({ candidate_id });

    await UserVoteCheck.create({
      identity_card_number,
      vote_status: true,
    });

    const voteVerifyToken = createToken(identity_card_number);

    const user = await User.findOne({ where: { identity_card_number } });
    await sendVerificationCodeEmail(user.email, voteVerifyToken);

    res
      .status(200)
      .json({ message: 'Vote stored successfully!', voteVerifyToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyVoteSubmitSuccess = async (req, res) => {
  const { voteVerifyToken } = req.body;

  try {
    const identity_card_number = jwt.decode(voteVerifyToken).username;
    const userVoteCheck = await UserVoteCheck.findOne({
      where: { identity_card_number },
    });

    if (!userVoteCheck) {
      return res.status(404).json({ error: 'Invalid token submitted' });
    }

    if (!userVoteCheck.vote_status) {
      return res
        .status(400)
        .json({ error: 'User vote not successfully stored' });
    }

    res.status(200).json({ message: 'Vote successfully stored' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitVote, storeVerifiedVote, verifyVoteSubmitSuccess };
