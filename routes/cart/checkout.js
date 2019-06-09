const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const CheckoutController = require('../../controllers/CheckoutController');

// Checkout Routes
router.post('/payment', auth, CheckoutController.payment);

module.exports = router;
