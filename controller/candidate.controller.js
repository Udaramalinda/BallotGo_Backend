const getCandidates = async (req, res) => {
  try {
    const candidates = "Nice role based authorization working.......!";
    res.status(200).json(candidates);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCandidates };