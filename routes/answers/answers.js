const express = require('express');
const router = express.Router();
const AnswersController = require('../../controllers/AnswersController');

// Permission Routes
router.post('/addanswer', AnswersController.addAnswer);
router.get('/getallanswers', AnswersController.getAllAnswers);
// router.get('/getallmodelnames', PermissionController.getAllModelNames);
// router.delete('/deletepermission', PermissionController.deletePermission);
// router.delete('/deletemanypermissions', PermissionController.deleteManyPermissions);

module.exports = router;