const express = require('express');
const router = express.Router();

const BrandController = require('../../controllers/BrandController');
const auth = require('../../middleware/auth');

// Brand Routes
router.post('/addbrand',(req, res, next) => auth(req, res, next, 'Create Brands'), BrandController.addBrand);
router.get('/getallbrands',(req, res, next) => auth(req, res, next, 'Read Brands'), BrandController.getAllBrands);
router.get('/getbrandsbycategory', BrandController.getBrandsByCategory);
router.get('/getbrand',(req, res, next) => auth(req, res, next, 'Read Brands'), BrandController.getBrand);
router.put('/editbrand',(req, res, next) => auth(req, res, next, 'Update Brands'), BrandController.editBrand);
router.delete('/deletebrand',(req, res, next) => auth(req, res, next, 'Delete Brands'), BrandController.deleteBrand);
router.delete('/deletemanybrands',(req, res, next) => auth(req, res, next, 'Delete Brands'), BrandController.deleteManyBrands);

module.exports = router;
