const express = require('express');
const router = express.Router();
const UserRolesController = require('../../controllers/UserRolesController');
const auth = require('../../middleware/auth');

// Role Routes
router.post('/adduserrole', (req, res, next) => auth(req, res, next, 'Create Roles'), UserRolesController.addUserRole);
router.get('/userroles', UserRolesController.getRoles);
router.delete('/deleterole', (req, res, next) => auth(req, res, next, 'Delete Roles'), UserRolesController.deleteUserRole);
router.delete(
	'/deletemanyroles',
	(req, res, next) => auth(req, res, next, 'Delete Roles'),
	UserRolesController.deleteManyUserRoles
);
router.post('/getrole', UserRolesController.getRole);
router.patch('/updaterole', (req, res, next) => auth(req, res, next, 'Update Roles'), UserRolesController.updateRole);

module.exports = router;
