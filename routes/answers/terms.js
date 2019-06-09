const express = require('express');
const router = express.Router();
const TermsController = require('../../controllers/TermsController');

// Term Routes
router.post('/addterm', TermsController.addTerm);
router.get('/getallterms', TermsController.getAllTerms);
router.get('/getterm', TermsController.getTerm);
router.delete('/deleteterm', TermsController.deleteTerm);
router.patch('/updateterm', TermsController.updateTerm);

module.exports = router;
