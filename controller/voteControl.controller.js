const Vote = require('../models/vote.model');
const Candidate = require('../models/candidate.model');
const UserVoteCheck = require('../models/userVoteCheck.model');
const Result = require('../models/result.model');

const startVote = async (req, res) => {
  try {
    await Vote.destroy({ where: {} });
    await Result.destroy({ where: {} });
    await UserVoteCheck.destroy({ where: {} });

    const candidates = await Candidate.findAll();

    for (let i = 0; i < candidates.length; i++) {
      await Result.create({
        candidate_id: candidates[i].candidate_id,
        name: candidates[i].name,
        total_vote: 0,
      });
    }

    res.status(200).json({ message: 'Vote started' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const endVote = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();

    for (let i = 0; i < candidates.length; i++) {
      const totalVote = await Vote.count({
        where: { candidate_id: candidates[i].candidate_id },
      });
      await Result.update(
        { total_vote: totalVote },
        { where: { candidate_id: candidates[i].candidate_id } }
      );
    }

    res.status(200).json({ message: 'Vote ended' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUniversalVerifiability = async (req, res) => {
  try {
    const userVoteCheck = await UserVoteCheck.findAll();
    res.status(200).json(userVoteCheck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { startVote, endVote, getResults, getUniversalVerifiability };
