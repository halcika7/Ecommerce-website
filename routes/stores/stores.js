const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const StoresController = require('../../controllers/StoresController');
const auth = require('../../middleware/auth');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let directory = `public/images/stores/`;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		cb(null, directory);
	},
	filename: (req, file, cb) => {
		cb(null, `${new Date().getTime()}.${file.originalname.split('.').pop()}`);
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

const multerStorePicture = multer({ storage: fileStorage, fileFilter });

// Stores Routes
router.post(
	'/addstore',
	(req, res, next) => auth(req, res, next, 'Create Stores'),
	multerStorePicture.single('picture'),
	StoresController.addStore
);
router.patch(
	'/updatestore',
	(req, res, next) => auth(req, res, next, 'Update Stores'),
	multerStorePicture.single('picture'),
	StoresController.updateStore
);
router.get('/getstores', (req, res, next) => auth(req, res, next, 'Read Stores'), StoresController.getAllStores);
router.get('/getstore', (req, res, next) => auth(req, res, next, 'Read Stores'), StoresController.getStore);
router.get('/getstorecontact', StoresController.getStoreContact);
router.get('/getstoresfront', StoresController.getAllStoresFront);
router.delete('/deletestore', (req, res, next) => auth(req, res, next, 'Delete Stores'), StoresController.deleteStore);

module.exports = router;
