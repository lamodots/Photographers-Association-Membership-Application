const crypto = require("crypto");

// Generate a single 6-digit membershipID
// const membershipID = `KSN-${crypto.randomInt(100000, 999999)}`; // 6-digit random number

// module.exports = membershipID;

// const crypto = require("crypto");

// Export a function that generates a new ID each time it's called
module.exports = function generateMembershipID() {
  return `KSN-${crypto.randomInt(100000, 999999)}`;
};
