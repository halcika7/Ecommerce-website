const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const UserController = require('../../controllers/UsersController');
const EmailController = require('../../controllers/EmailController');
const UserRolesController = require('../../controllers/UserRolesController');
const ActivateAccountController = require('../../controllers/ActivateAccountController');
const PermissionController = require('../../controllers/PermissionController');

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        let directory = `public/images/${req.body.username}/`;
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        directory = `${directory}profileImage/`;
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        cb(null, directory)
    },
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`)
    },
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else {
        cb(null,false);
    }
};

const multerProfilePicture = multer({
    storage: fileStorage, 
    fileFilter 
});

// User Routes
router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.post('/adduser', UserController.addNewUser);

router.post('/resetpasswordemail', EmailController.sendResetPasswordEmail);

router.post('/resetpassword', UserController.resetPassword);

router.post('/activateaccount', ActivateAccountController.activateAccount);

router.post('/resendactivateaccount', ActivateAccountController.resendActivationMail);

router.put('/updateprofilepicture', multerProfilePicture.single('profilePicture') , UserController.updateProfilePicture);

router.get('/getuserphoto', UserController.getProfilePicture);

router.put('/updatepassword', UserController.updatePassword);

router.patch('/updateuser', UserController.updateUser);

router.get('/allusers', UserController.getAllUsers);

router.get('/singleuser', UserController.getSingleUser);

router.delete('/deleteuser', UserController.deleteUser);

router.post('/addpermission', PermissionController.addPermission);

router.get('/getallpermissions', PermissionController.getAllPermissions);

router.delete('/deletepermission', PermissionController.deletePermission);

router.delete('/deleteallpermissions', PermissionController.deleteAllPermission);

router.post('/adduserrole', UserRolesController.addUserRole);

router.get('/userroles', UserRolesController.getRoles);

router.delete('/deleteallroles', UserRolesController.deleteAllRoles);

router.delete('/deleterole', UserRolesController.deleteUserRole);

router.post('/getrole', UserRolesController.getRole);

router.patch('/updaterole', UserRolesController.updateRole);

module.exports = router;