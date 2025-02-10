const express = require('express');
const router = express.Router();
const { createShortUrl, redirectShortUrl } = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/shorten
router.post('/', authMiddleware, createShortUrl);

// GET /api/shorten/:alias
router.get('/:alias', redirectShortUrl);

module.exports = router;