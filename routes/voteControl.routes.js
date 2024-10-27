const express = require('express');
const router = express.Router();
const authorizeRole = require('../middleware/authenticateJwtToken');
const { startVote, endVote, getResults, getUniversalVerifiability } = require('../controller/voteControl.controller');

router.get('/start', authorizeRole(['ADMIN']), startVote);
router.get('/end', authorizeRole(['ADMIN']), endVote);
router.get('/results', getResults);
router.get('/universal-verifiability', getUniversalVerifiability);

module.exports = router;
