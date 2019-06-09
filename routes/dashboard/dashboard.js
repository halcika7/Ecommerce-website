const express = require('express');
const router = express.Router();

const DashboardController = require('../../controllers/DashboardController');

// Dashboard Routes
router.get('/dashboard', DashboardController.dashboard);

module.exports = router;
