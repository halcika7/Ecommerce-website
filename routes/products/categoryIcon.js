const express = require('express');
const router = express.Router();

const CategoryIconController = require('../../controllers/CategoryIconController');

// Category Icon Routes
router.post('/addcategoryicon', CategoryIconController.addCategoryIcon);
router.get('/getallcategoryicons', CategoryIconController.getAllCategoryIcons);
router.get('/getcategoryicon', CategoryIconController.getCategoryIcon);
router.put('/editcategoryicon', CategoryIconController.editCategoryIcon);
router.delete('/deletecategoryicon', CategoryIconController.deleteCategoryIcon);
router.delete(
	'/deletemanycategoryicons',
	CategoryIconController.deleteManyCategoryIcons
);

module.exports = router;
