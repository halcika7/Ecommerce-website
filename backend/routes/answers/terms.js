const express = require('express');
const router = express.Router();
const TermsController = require('../../controllers/TermsController');
const auth = require('../../middleware/auth');

// Term Routes
router.post('/addterm', (req, res, next) => auth(req, res, next, 'Create Terms'), TermsController.addTerm);
router.get('/getallterms', TermsController.getAllTerms);
router.get('/getterm', (req, res, next) => auth(req, res, next, 'Read Terms'), TermsController.getTerm);
router.delete('/deleteterm', (req, res, next) => auth(req, res, next, 'Delete Terms'), TermsController.deleteTerm);
router.patch('/updateterm', (req, res, next) => auth(req, res, next, 'Update Terms'), TermsController.updateTerm);

module.exports = router;
