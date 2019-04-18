const express = require('express');
const router = express.Router();
const PermissionController = require('../../controllers/PermissionController');

// Permission Routes
router.post('/addpermission', PermissionController.addPermission);
router.get('/getallpermissions', PermissionController.getAllPermissions);
router.get('/getallmodelnames', PermissionController.getAllModelNames);
router.delete('/deletepermission', PermissionController.deletePermission);
router.delete('/deletemanypermissions', PermissionController.deleteManyPermissions);

module.exports = router;