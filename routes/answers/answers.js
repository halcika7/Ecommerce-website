const express = require('express');
const router = express.Router();
const AnswersController = require('../../controllers/AnswersController');

// Answers Routes
router.post('/addanswer', AnswersController.addAnswer);
router.get('/getallanswers', AnswersController.getAllAnswers);
router.get('/getanswer', AnswersController.getAnswer);
router.delete('/deleteanswer', AnswersController.deleteAnswer);
router.patch('/updateanswer', AnswersController.updateAnswer);

module.exports = router;