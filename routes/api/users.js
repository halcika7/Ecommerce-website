const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const UserController = require('../../controllers/UsersController');
const EmailController = require('../../controllers/EmailController');
const UserRolesController = require('../../controllers/UserRolesController');
const ActivateAccountController = require('../../controllers/ActivateAccountController');

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

router.post('/resetpasswordemail', EmailController.sendResetPasswordEmail);

router.post('/resetpassword', UserController.resetPassword);

router.post('/activateaccount', ActivateAccountController.activateAccount);

router.post('/resendactivateaccount', ActivateAccountController.resendActivationMail);

router.put('/updateprofilepicture', multerProfilePicture.single('profilePicture') , UserController.updateProfilePicture);

router.put('/updatepassword', UserController.updatePassword);

router.get('/allusers', UserController.getAllUsers);

router.get('/singleuser', UserController.getSingleUser);

router.delete('/deleteuser', UserController.deleteUser);

router.get('/userroles', UserRolesController.getRoles);

module.exports = router;