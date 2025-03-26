const crypto = require("crypto");

// Generate a single 6-digit membershipID
const membershipID = `KSN-${crypto.randomInt(100000, 999999)}`; // 6-digit random number

module.exports = membershipID;
