const express = require('express');
const router = express.Router();
const UserRolesController = require('../../controllers/UserRolesController');

// Role Routes
router.post('/adduserrole', UserRolesController.addUserRole);
router.get('/userroles', UserRolesController.getRoles);
router.delete('/deleterole', UserRolesController.deleteUserRole);
router.delete('/deletemanyroles', UserRolesController.deleteManyUserRoles);
router.post('/getrole', UserRolesController.getRole);
router.patch('/updaterole', UserRolesController.updateRole);

module.exports = router;
