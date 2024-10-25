const Candidate = require('../models/candidate.model');

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCandidateById = async (req, res) => {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createCandidate = async (req, res) => {
  const { name, age, date_of_birth } = req.body;

  try {
    const candidate = await Candidate.create({
      name,
      age,
      date_of_birth,
    });
    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, age, date_of_birth } = req.body;

  try {
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    candidate.name = name;
    candidate.age = age;
    candidate.date_of_birth = date_of_birth;
    await candidate.save();
    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    await candidate.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
