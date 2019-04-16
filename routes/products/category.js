const express = require('express');
const router = express.Router();

const CategoryController = require('../../controllers/CategoriesController');

// Category Routes
router.post('/addcategory', CategoryController.addCategory);
router.get('/getallcategories', CategoryController.getAllCategories);
router.get('/getcategory', CategoryController.getCategory);
router.put('/editcategory', CategoryController.editCategory);
router.delete('/deletecategory', CategoryController.deleteCategory);
router.delete('/deletemanycategories', CategoryController.deleteManyCategories);

module.exports = router;