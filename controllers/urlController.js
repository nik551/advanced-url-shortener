const Url = require("../models/Url");
const Analytics = require("../models/Analytics");
const client = require("../config/redis");
const generateShortId = require("../utils/generateShortId");

const createShortUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const { userId } = req.user;

  try {
    const shortId = customAlias || generateShortId();
    const shortUrl = `${req.protocol}://${req.get("host")}/api/shorten/${shortId}`;

    const url = new Url({ shortId, longUrl, userId, customAlias, topic });
    await url.save();

    // Cache the short URL
    client.set(shortId, longUrl);

    res.status(201).json({ shortUrl, createdAt: url.createdAt });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Custom alias is already in use. Please choose a different one.",
      });
    }
    console.log(err);
    res.status(400).json({ error: "Failed to create short URL" });
  }
};

const redirectShortUrl = async (req, res) => {
  const { alias } = req.params;

  try {
    // Check Redis cache
    const cachedUrl = await client.get(alias);
    if (cachedUrl) {
      // Log analytics
      const analytics = new Analytics({
        shortId: alias,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });
      await analytics.save();

      // Increment click count
      await Url.findOneAndUpdate({ shortId: alias }, { $inc: { clicks: 1 } });

      return res.redirect(cachedUrl);
    }

    // Check database
    const url = await Url.findOne({ shortId: alias });
    if (!url) return res.status(404).json({ error: "URL not found" });

    // Cache the URL
    client.set(alias, url.longUrl);

    // Log analytics
    const analytics = new Analytics({
      shortId: alias,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await analytics.save();

    // Increment click count
    await Url.findOneAndUpdate({ shortId: alias }, { $inc: { clicks: 1 } });

    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createShortUrl, redirectShortUrl };
