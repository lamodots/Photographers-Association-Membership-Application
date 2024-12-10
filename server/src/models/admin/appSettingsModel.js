const mongoose = require("mongoose");

const appSettingsSchema = new mongoose.Schema({
  appname: String,
  paymentapi: String,
  whatsappapi: String,
  pagelink: [String],
  applogo: String,
});

module.exports = mongoose.model("AppSettings", appSettingsSchema);
