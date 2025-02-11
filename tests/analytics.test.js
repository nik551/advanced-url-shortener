const request = require('supertest');
const app = require('../app');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateShortId = require("../utils/generateShortId");


describe('Analytics API', () => {
  let token;
  const genRand= generateShortId();
  beforeAll(async () => {
    console.log("Type of app:", typeof app);
    // Create a mock user and generate a JWT
    const user = new User({ googleId: generateShortId(), email: `${generateShortId()}@example.com` });
    await user.save();
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create mock URLs and analytics data
    
    const url = new Url({ shortId: `${genRand}` , longUrl: 'https://example.com', userId: user._id });
    await url.save();

    const analytics = new Analytics({
      shortId: genRand,
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
      osType: 'Windows',
      deviceType: 'desktop',
      country: 'USA',
      city: 'New York',
    });
    await analytics.save();
  });

  it('should get URL analytics', async () => {
    const res = await request(app)
      .get(`/api/analytics/${genRand}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalClicks');
    expect(res.body).toHaveProperty('uniqueUsers');
    expect(res.body).toHaveProperty('clicksByDate');
  });

  it('should get topic analytics', async () => {
    const res = await request(app)
      .get('/api/analytics/topic/marketing')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalClicks');
    expect(res.body).toHaveProperty('uniqueUsers');
    expect(res.body).toHaveProperty('clicksByDate');
  });

  it('should get overall analytics', async () => {
    const res = await request(app)
      .get('/api/analytics/overall')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalUrls');
    expect(res.body).toHaveProperty('totalClicks');
    expect(res.body).toHaveProperty('uniqueUsers');
    expect(res.body).toHaveProperty('clicksByDate');
  });
});