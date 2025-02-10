const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  shortId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  osType: { type: String },
  deviceType: { type: String },
  geolocation: { type: Object },
});

module.exports = mongoose.model('Analytics', analyticsSchema);