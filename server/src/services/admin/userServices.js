const { User } = require("../../models");

async function getUserDetailsService(userId) {
  try {
    const user = await User.findById(userId).select("-password");

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = getUserDetailsService;
