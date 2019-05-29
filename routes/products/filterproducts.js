const express = require('express');
const router = express.Router();
const FilterProductsController = require('../../controllers/FilterProductsController');

// Filter Products Routes

router.get('/getproducts', FilterProductsController.getProductsOnLoad);

module.exports = router;
