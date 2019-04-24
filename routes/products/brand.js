const express = require('express');
const router = express.Router();

const BrandController = require('../../controllers/BrandController');

// Brand Routes
router.post('/addbrand', BrandController.addBrand);
router.get('/getallbrands', BrandController.getAllBrands);
router.get('/getbrandsbycategory', BrandController.getBrandsByCategory);
router.get('/getbrand', BrandController.getBrand);
router.put('/editbrand', BrandController.editBrand);
router.delete('/deletebrand', BrandController.deleteBrand);
router.delete('/deletemanybrands', BrandController.deleteManyBrands);

module.exports = router;