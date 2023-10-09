const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { generateAndInsertFakeData, fetchDataFromInfluxDB } = require('../controllers/influxController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.post('/generate-data', authenticateToken, generateAndInsertFakeData);
router.get('/fetch-data', authenticateToken, fetchDataFromInfluxDB);

module.exports = router;
