const express = require('express');
const router = express.Router();

const DashboardController = require('../../controllers/DashboardController');
const auth = require('../../middleware/auth');

// Dashboard Routes
router.get('/dashboard', auth, DashboardController.dashboard);

module.exports = router;
