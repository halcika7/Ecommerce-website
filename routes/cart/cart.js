const express = require('express');
const router = express.Router();

const CartController = require('../../controllers/CartController');

// Cart Routes
router.post('/addtocart', CartController.addToCart);
router.delete('/deletefromcart', CartController.deleteFromCart);
router.patch('/updatecartitem', CartController.updateCartItem);
router.post('/movetosaveforlater', CartController.moveToSaveForLater);
router.post('/movetocart', CartController.moveToCart);
router.delete('/deletefromsave', CartController.deleteFromSavedForLater);
router.post('/applycoupon', CartController.applyCoupon);
router.delete('/removecoupon', CartController.removeCoupon);

module.exports = router;