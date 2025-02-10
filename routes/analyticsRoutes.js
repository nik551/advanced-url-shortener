const express = require('express');
const router = express.Router();
const { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/analytics/overall
router.get('/overall', authMiddleware, getOverallAnalytics);
// GET /api/analytics/:alias
router.get('/:alias', authMiddleware, getUrlAnalytics);

// GET /api/analytics/topic/:topic
router.get('/topic/:topic', authMiddleware, getTopicAnalytics);


module.exports = router;