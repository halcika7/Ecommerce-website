const express = require('express');
const router = express.Router();
const PermissionController = require('../../controllers/PermissionController');
const auth = require('../../middleware/auth');

// Permission Routes
router.post('/addpermission', (req, res, next) => auth(req, res, next, 'Create Permissions'), PermissionController.addPermission);
router.get('/getallpermissions', (req, res, next) => auth(req, res, next, 'Read Permissions'), PermissionController.getAllPermissions);
router.get('/getallmodelnames', (req, res, next) => auth(req, res, next, 'Read Permissions'), PermissionController.getAllModelNames);
router.delete('/deletepermission', (req, res, next) => auth(req, res, next, 'Delete Permissions'), PermissionController.deletePermission);
router.delete(
	'/deletemanypermissions',
	(req, res, next) => auth(req, res, next, 'Delete Permissions'),
	PermissionController.deleteManyPermissions
);

module.exports = router;
