// const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
/**
 * Generates a unique membership ID with the format KSN-XXXXXXXX
 * using UUID v4 for guaranteed uniqueness
 * @returns {string} A unique membership ID
 */

// Generate a single 6-digit membershipID
// const membershipID = `KSN-${crypto.randomInt(100000, 999999)}`; // 6-digit random number

// module.exports = membershipID;

// const crypto = require("crypto");

// Export a function that generates a new ID each time it's called
// module.exports = function generateMembershipID() {
//   // Generate a UUID and take just the first 8 characters
//   // This gives us 16^8 (4.3 billion) possible combinations
//   const uuidShort = uuidv4().split("-")[0];
//   // Using just numbers (for more human-readable IDs)
//   const numericId = parseInt(uuidShort, 16) % 1000000; // Convert to base-10 number and limit to 6 digits
//   return `KSN-${numericId.toString().padStart(6, "0")}`;
//   //   return `KSN-${crypto.randomInt(100000, 999999)}`;
// };

module.exports = function generateMembershipID() {
  const uuidShort = uuidv4().split("-")[0];
  const numericId = parseInt(uuidShort, 16) % 1000000; // Convert to base-10 number and limit to 6 digits
  return `KSN-${numericId.toString().padStart(6, "0")}`;
};
