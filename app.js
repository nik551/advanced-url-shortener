const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const client = require("./config/redis");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  client.connect().then(() => console.log("Connected to Redis"));
  connectDb();


app.use('/api/auth', authRoutes);
app.use('/api/shorten', rateLimiter, urlRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;