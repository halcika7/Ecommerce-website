const express = require('express');
const router = express.Router();

const CategoryIconController = require('../../controllers/CategoryIconController');
const auth = require('../../middleware/auth');

// Category Icon Routes
router.post('/addcategoryicon',(req, res, next) => auth(req, res, next, 'Create Categoryicons'), CategoryIconController.addCategoryIcon);
router.get('/getallcategoryicons',(req, res, next) => auth(req, res, next, 'Read Categoryicons'), CategoryIconController.getAllCategoryIcons);
router.get('/getcategoryicon',(req, res, next) => auth(req, res, next, 'Read Categoryicons'), CategoryIconController.getCategoryIcon);
router.put('/editcategoryicon',(req, res, next) => auth(req, res, next, 'Update Categoryicons'), CategoryIconController.editCategoryIcon);
router.delete('/deletecategoryicon',(req, res, next) => auth(req, res, next, 'Delete Categoryicons'), CategoryIconController.deleteCategoryIcon);
router.delete(
	'/deletemanycategoryicons',(req, res, next) => auth(req, res, next, 'Delete Categoryicons'),
	CategoryIconController.deleteManyCategoryIcons
);

module.exports = router;
