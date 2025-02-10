const Url = require("../models/Url");
const Analytics = require("../models/Analytics");

exports.getUrlAnalytics = async (req, res) => {
  const { alias } = req.params;
  try {
    const url = await Url.findOne({ shortId: alias });
    if (!url) return res.status(404).json({ error: "URL not found" });

    const analytics = await Analytics.find({ shortId: alias });

    // Calculate total clicks and unique users
    const totalClicks = analytics.length;
    const uniqueUsers = [...new Set(analytics.map((a) => a.ipAddress))].length;

    // Calculate clicks by date
    const clicksByDate = analytics.reduce((acc, curr) => {
      const date = curr.timestamp.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Format clicksByDate as an array of objects
    const formattedClicksByDate = Object.keys(clicksByDate).map((date) => ({
      date,
      clicks: clicksByDate[date],
    }));

    res.json({
      totalClicks,
      uniqueUsers,
      clicksByDate: formattedClicksByDate,
      analytics,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTopicAnalytics = async (req, res) => {
  const { topic } = req.params;

  try {
    const urls = await Url.find({ topic });
    const analytics = await Analytics.find({
      shortId: { $in: urls.map((u) => u.shortId) },
    });

    // Calculate total clicks and unique users
    const totalClicks = analytics.length;
    const uniqueUsers = [...new Set(analytics.map((a) => a.ipAddress))].length;

    // Calculate clicks by date
    const clicksByDate = analytics.reduce((acc, curr) => {
      const date = curr.timestamp.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Format clicksByDate as an array of objects
    const formattedClicksByDate = Object.keys(clicksByDate).map((date) => ({
      date,
      clicks: clicksByDate[date],
    }));

    res.json({
      totalClicks,
      uniqueUsers,
      clicksByDate: formattedClicksByDate,
      urls,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOverallAnalytics = async (req, res) => {
  console.log("heyyy");
  const { userId } = req.user;
  console.log(userId);
  try {
    const urls = await Url.find({ userId });
    const analytics = await Analytics.find({
      shortId: { $in: urls.map((u) => u.shortId) },
    });

    // Calculate total URLs, total clicks, and unique users
    const totalUrls = urls.length;
    const totalClicks = analytics.length;
    const uniqueUsers = [...new Set(analytics.map((a) => a.ipAddress))].length;

    // Calculate clicks by date
    const clicksByDate = analytics.reduce((acc, curr) => {
      const date = curr.timestamp.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Format clicksByDate as an array of objects
    const formattedClicksByDate = Object.keys(clicksByDate).map((date) => ({
      date,
      clicks: clicksByDate[date],
    }));

    res.json({
      totalUrls,
      totalClicks,
      uniqueUsers,
      clicksByDate: formattedClicksByDate,
      analytics,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
