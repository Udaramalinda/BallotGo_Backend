const express = require('express');
const router = express.Router();
const { getCandidates, getCandidateById, createCandidate, updateCandidate, deleteCandidate } = require('../controller/candidate.controller');
const authorizeRole = require('../middleware/authenticateJwtToken');

router.get('/', authorizeRole(['ADMIN', 'USER']), getCandidates);
router.get('/:id', authorizeRole(['ADMIN', 'USER']), getCandidateById);
router.post('/', authorizeRole(['ADMIN']), createCandidate);
router.put('/:id', authorizeRole(['ADMIN']), updateCandidate);
router.delete('/:id', authorizeRole(['ADMIN']), deleteCandidate);

module.exports = router;