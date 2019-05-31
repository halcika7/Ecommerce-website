const express = require('express');
const router = express.Router();
const FilterProductsController = require('../../controllers/FilterProductsController');

// Filter Products Routes
router.get('/filterproducts', FilterProductsController.filterProducts);
router.get('/filters', FilterProductsController.filters);

module.exports = router;
