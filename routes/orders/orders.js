const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController');
const auth = require('../../middleware/auth');

// Order Routes
router.get('/allorders', OrderController.getAllOrders);
router.get('/userorders', OrderController.getAllUserOrders);
router.get('/order', OrderController.getOrder);
router.patch('/deleteuserorder', OrderController.deleteUserOrder);
router.patch('/updateorder', OrderController.updateOrder);
router.delete('/deleteorder', OrderController.deleteOrder);

module.exports = router;
