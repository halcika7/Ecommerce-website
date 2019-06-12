const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const ProductController = require('../../controllers/ProductsController');
const auth = require('../../middleware/auth');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		let directory = `public/images/temp`;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		directory = `${directory}/product`;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
		cb(null, directory);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${new Date().getTime() * Math.random()}.${file.originalname
				.split('.')
				.pop()}`
		);
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

const multerPictures = multer({
	storage: fileStorage,
	fileFilter
});
// Product Routes
router.post(
	'/addproduct',
	(req, res, next) => auth(req, res, next, 'Create Products'),
	multerPictures.array('pictures'),
	ProductController.addProduct
);
router.get('/getbannerproducts', ProductController.getBannerProducts);
router.get('/getfeaturedproducts', ProductController.getFeaturedProducts);
router.get('/gettopsellingproducts', ProductController.getTopSellingProducts);
router.get('/getourproducts', ProductController.getOurProducts);
router.get('/getdailyofferproducts', ProductController.getDailyOfferProducts);
router.get('/getweeklyofferproducts', ProductController.getWeeklyOfferProducts);
router.get('/getnewproducts', ProductController.getNewProducts);
router.get('/getproduct', ProductController.getProduct);
router.get('/getallproducts', ProductController.getAllProducts);
router.get('/serachforproduct', ProductController.searchForProduct);
router.delete('/deleteproduct',(req, res, next) => auth(req, res, next, 'Delete Products'), ProductController.deleteProduct);

module.exports = router;
