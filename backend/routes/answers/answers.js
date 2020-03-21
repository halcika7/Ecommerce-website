const express = require('express');
const router = express.Router();
const AnswersController = require('../../controllers/AnswersController');
const auth = require('../../middleware/auth');

// Answers Routes
router.post('/addanswer',(req, res, next) => auth(req, res, next, 'Create Answers'), AnswersController.addAnswer);
router.get('/getallanswers', AnswersController.getAllAnswers);
router.get('/getanswer',(req, res, next) => auth(req, res, next, 'Read Answers'), AnswersController.getAnswer);
router.delete('/deleteanswer', (req, res, next) => auth(req, res, next, 'Delete Answers') , AnswersController.deleteAnswer);
router.patch('/updateanswer', (req, res, next) => auth(req, res, next, 'Update Answers') , AnswersController.updateAnswer);

module.exports = router;
