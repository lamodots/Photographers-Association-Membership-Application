const createTokenUser = require("./createTokenUser");
const jwt = require("./jwt");
const calculateExpiryDate = require("./calculateExpiryDat");
const {
  sendGridEmailTemplate,
  verifyUserEmailTemplate,
  sendResetPassswordEmailTemplate,
} = require("./emailTemplate");
const { generateReference } = require("./generateOfflineReference");

module.exports = {
  createTokenUser,
  jwt,
  calculateExpiryDate,
  sendGridEmailTemplate,
  verifyUserEmailTemplate,
  sendResetPassswordEmailTemplate,
  generateReference,
};
