const express = require('express');
const router = express.Router();
const authorizeRole = require('../middleware/authenticateJwtToken');
const { requestKeys } = require('../trusted_authority/authority_controller/authorityKey.controller');
const { submitVote, storeVerifiedVote, verifyVoteSubmitSuccess } = require('../trusted_authority/authority_controller/authorityBlindSignature.controller');
const { requestOtpToVote, verifyOtpAndSendCandidateList } = require('../controller/vote.controller');


router.get('/request-keys', requestKeys);
router.get('/request-otp', authorizeRole(['USER']), requestOtpToVote);
router.post('/verify-otp', authorizeRole(['USER']), verifyOtpAndSendCandidateList);
router.post('/submit-vote', authorizeRole(['USER']), submitVote);
router.post('/store-verified-vote', authorizeRole(['USER']), storeVerifiedVote);
router.post('/verify-vote-submit-success', authorizeRole(['USER']), verifyVoteSubmitSuccess);

module.exports = router;