const express = require('express');
const { getListing } = require('../controllers/listingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get',  getListing);

module.exports = router;
