const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const StoresController = require('../../controllers/StoresController');

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
	multerStorePicture.single('picture'),
	StoresController.addStore
);
router.patch(
	'/updatestore',
	multerStorePicture.single('picture'),
	StoresController.updateStore
);
router.get('/getstores', StoresController.getAllStores);
router.get('/getstore', StoresController.getStore);
router.get('/getstorecontact', StoresController.getStoreContact);
router.get('/getstoresfront', StoresController.getAllStoresFront);
router.delete('/deletestore', StoresController.deleteStore);

module.exports = router;
