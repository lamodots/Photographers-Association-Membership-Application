const { User } = require("../../models");

async function getUserDetailsService(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    console.log("user from service", user);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = getUserDetailsService;
