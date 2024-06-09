const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Define routes
router.get('/search', searchController.search);

module.exports = router;

