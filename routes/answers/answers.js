const express = require('express');
const router = express.Router();
const AnswersController = require('../../controllers/AnswersController');
const auth = require('../../middleware/auth');

// Answers Routes
router.post('/addanswer', AnswersController.addAnswer);
router.get('/getallanswers', auth, AnswersController.getAllAnswers);
router.get('/getanswer', auth, AnswersController.getAnswer);
router.delete('/deleteanswer', AnswersController.deleteAnswer);
router.patch('/updateanswer', AnswersController.updateAnswer);

module.exports = router;
