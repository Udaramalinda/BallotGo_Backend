const express = require('express');
const router = express.Router();
const { getCandidates } = require('../controller/candidate.controller');
const authorizeRole = require('../middleware/authenticateJwtToken');

// GET route to fetch all candidates
router.get('/', authorizeRole(['ADMIN', 'USER']), getCandidates);

module.exports = router;