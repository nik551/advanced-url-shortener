const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/authController');

// POST /api/auth/google
router.post('/google', googleLogin);

module.exports = router;