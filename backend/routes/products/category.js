const express = require('express');
const router = express.Router();

const CategoryController = require('../../controllers/CategoriesController');
const auth = require('../../middleware/auth');

// Category Routes
router.post('/addcategory', (req, res, next) => auth(req, res, next, 'Create Categories'), CategoryController.addCategory);
router.get('/getallcategories', CategoryController.getAllCategories);
router.get('/getcategory', (req, res, next) => auth(req, res, next, 'Read Categories'), CategoryController.getCategory);
router.put('/editcategory', (req, res, next) => auth(req, res, next, 'Update Categories'), CategoryController.editCategory);
router.delete('/deletecategory', (req, res, next) => auth(req, res, next, 'Delete Categories'), CategoryController.deleteCategory);
router.delete('/deletemanycategories', (req, res, next) => auth(req, res, next, 'Delete Categories'), CategoryController.deleteManyCategories);

module.exports = router;
