const express = require('express');
const router = express.Router();
const {
  getElections,
  getElectionById,
  createElection,
  updateElection,
  deleteElection,
  getElectionCandidates,
  addElectionCandidates,
  deleteElectionCandidate,
} = require('../controller/election.controller');
const authorizeRole = require('../middleware/authenticateJwtToken');

router.get('/', authorizeRole(['ADMIN', 'USER']), getElections);
router.get('/:id', authorizeRole(['ADMIN', 'USER']), getElectionById);
router.post('/', authorizeRole(['ADMIN']), createElection);
router.put('/:id', authorizeRole(['ADMIN']), updateElection);
router.delete('/:id', authorizeRole(['ADMIN']), deleteElection);

router.get(
  '/:id/candidates',
  authorizeRole(['ADMIN', 'USER']),
  getElectionCandidates
);
router.post('/candidates', authorizeRole(['ADMIN']), addElectionCandidates);
router.delete('/candidates', authorizeRole(['ADMIN']), deleteElectionCandidate);

module.exports = router;
