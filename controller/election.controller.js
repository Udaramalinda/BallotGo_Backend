const Candidate = require('../models/candidate.model');
const Election = require('../models/election.model');

const getElections = async (req, res) => {
  try {
    const elections = await Election.findAll();
    res.status(200).json(elections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getElectionById = async (req, res) => {
  const { id } = req.params;

  try {
    const election = await Election.findByPk(id);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createElection = async (req, res) => {
  const { name, start_date, end_date } = req.body;

  try {
    const election = await Election.create({
      name,
      start_date,
      end_date,
    });
    res.status(201).json(election);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateElection = async (req, res) => {
  const { id } = req.params;
  const { name, start_date, end_date } = req.body;

  try {
    const election = await Election.findByPk(id);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    election.name = name;
    election.start_date = start_date;
    election.end_date = end_date;
    await election.save();
    res.status(200).json(election);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteElection = async (req, res) => {
  const { id } = req.params;

  try {
    const election = await Election.findByPk(id);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    await election.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getElectionCandidates = async (req, res) => {
  const { id } = req.params;

  try {
    const election = await Election.findByPk(id, {
      include: Candidate,
    });
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const addElectionCandidates = async (req, res) => {
  const { electionId, candidateIds } = req.body;

  try {
    const election = await Election.findByPk(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    const candidates = await Candidate.findAll({
      where: {
        candidate_id: candidateIds,
      },
    });
    await election.addCandidates(candidates);
    res.status(201).json({ message: 'Candidates added to election' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteElectionCandidate = async (req, res) => {
  const { electionId, candidateId } = req.body;

  try {
    const election = await Election.findByPk(electionId);
    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    await election.removeCandidate(candidate);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getElections,
  getElectionById,
  createElection,
  updateElection,
  deleteElection,
  addElectionCandidates,
  getElectionCandidates,
  deleteElectionCandidate
};
