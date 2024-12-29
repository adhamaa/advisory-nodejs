const express = require('express');
const { testConnection } = require('../controllers/testController');
const { authMiddleware } = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/test-connection', authMiddleware, testConnection);

module.exports = router;
