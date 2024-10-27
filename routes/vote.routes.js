const express = require('express');
const router = express.Router();
const authorizeRole = require('../middleware/authenticateJwtToken');
const { requestKeys } = require('../trusted_authority/authority_controller/authorityKey.controller');
const { requestOtpToVote, verifyOtpAndSendCandidateList } = require('../controller/vote.controller');


router.get('/request-keys', requestKeys);
router.get('/request-otp', authorizeRole(['USER']), requestOtpToVote);
router.post('/verify-otp', authorizeRole(['USER']), verifyOtpAndSendCandidateList);

module.exports = router;