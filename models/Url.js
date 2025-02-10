const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  userId: { type: String, required: true },
  customAlias: { type: String },
  topic: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", urlSchema);
