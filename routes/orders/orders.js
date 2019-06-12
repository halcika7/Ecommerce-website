const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController');
const auth = require('../../middleware/auth');

// Order Routes
router.get('/allorders', auth, OrderController.getAllOrders);
router.get('/userorders', auth, OrderController.getAllUserOrders);
router.get('/order', auth, OrderController.getOrder);
router.patch('/deleteuserorder', auth, OrderController.deleteUserOrder);
router.patch('/updateorder', (req, res, next) => auth(req, res, next, 'Update Orders'), OrderController.updateOrder);
router.delete('/deleteorder', (req, res, next) => auth(req, res, next, 'Delete Orders'), OrderController.deleteOrder);

module.exports = router;
