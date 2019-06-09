const express = require('express');
const router = express.Router();

const CouponController = require('../../controllers/CouponController');

// Coupon Routes
router.post('/addcoupon', CouponController.addCoupon);
router.delete('/deletecoupon', CouponController.deleteCoupon);
router.get('/getcoupons', CouponController.getAllCoupons);

module.exports = router;
