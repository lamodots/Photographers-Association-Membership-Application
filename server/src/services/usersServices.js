const { User } = require("../models");

async function getAllUsersService() {
  const users = await User.find({})
    .select("-password")
    .populate({
      path: "userSubscription",
      populate: {
        path: "planId",
        model: "SubscriptionPlan",
        select: "name interval amount",
      },
    });
  return users;
}

module.exports = { getAllUsersService };
