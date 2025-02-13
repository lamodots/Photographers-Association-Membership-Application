const mongoose = require("mongoose");

const appSettingsSchema = new mongoose.Schema({
  appname: String,
  appname_acronym: String,
  paymentapi: String,
  whatsappapi: String,
  pagelink: [String],
  applogo: String,
  sendgridapi: String,
});

module.exports = mongoose.model("AppSettings", appSettingsSchema);
