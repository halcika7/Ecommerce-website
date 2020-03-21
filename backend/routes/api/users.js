const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const UserController = require('../../controllers/UsersController');
const EmailController = require('../../controllers/EmailController');
const ActivateAccountController = require('../../controllers/ActivateAccountController');
const auth = require('../../middleware/auth');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let directory = `public/images/users/`;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		directory = `${directory}${req.body.username}/`;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		cb(null, directory);
	},
	filename: (req, file, cb) => {
		cb(null, `${file.originalname}`);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const multerProfilePicture = multer({
	storage: fileStorage,
	fileFilter
});

// User Routes
router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.post('/adduser',(req, res, next) => auth(req, res, next, 'Create Users'), UserController.addNewUser);

router.post('/resetpasswordemail', EmailController.sendResetPasswordEmail);

router.post('/resetpassword', UserController.resetPassword);

router.post('/activateaccount', ActivateAccountController.activateAccount);

router.post(
	'/resendactivateaccount',
	ActivateAccountController.resendActivationMail
);

router.put(
	'/updateprofilepicture',
	auth,
	multerProfilePicture.single('profilePicture'),
	UserController.updateProfilePicture
);

router.get('/getuserphoto', UserController.getProfilePicture);

router.put('/updatepassword', auth, UserController.updatePassword);

router.patch('/updateuser', (req, res, next) => auth(req, res, next, 'Update Users'), UserController.updateUser);

router.get('/allusers', auth, UserController.getAllUsers);

router.get('/singleuser',auth, UserController.getSingleUser);

router.delete('/deleteuser',(req, res, next) => auth(req, res, next, 'Delete Users'), UserController.deleteUser);

module.exports = router;
