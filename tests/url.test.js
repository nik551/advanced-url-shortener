const request = require('supertest');
const app = require('../app');
const Url = require('../models/Url');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateShortId = require("../utils/generateShortId");


describe('URL API', () => {
  let token;

  beforeAll(async () => {
    // Create a mock user and generate a JWT
    const user = new User({ googleId: generateShortId(), email: `${generateShortId()}@example.com` });
    await user.save();
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should create a short URL', async () => {
    console.log(app)
    const res = await request(app)
      .post('/api/shorten')
      .set('Authorization', `Bearer ${token}`)
      .send({ longUrl: 'https://google.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortUrl');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('should return 401 for unauthorized access', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ longUrl: 'https://google.com' });

    expect(res.statusCode).toBe(401);
  });

  it('should redirect to the original URL', async () => {
    const randomShortId = generateShortId();
    const url = new Url({ shortId: randomShortId, longUrl: 'https://google.com', userId: '123' });
    await url.save();

    const res = await request(app).get(`/api/shorten/${randomShortId}`);

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('https://google.com');
  });

  it('should return 404 for invalid short URL', async () => {
    const res = await request(app).get('/api/shorten/invalid');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});