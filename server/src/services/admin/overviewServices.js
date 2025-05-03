// const User = require("../models/User");
// const MembershipDues = require("../models/UserMemberShip");
// const WelfareDues = require("../models/UserWelfare");

const { WelfareDues, MembershipDues, User } = require("../../models");

// const getOverviewStats = async () => {
//   // Calculate total revenue
//   const totalRevenue = await MembershipDues.aggregate([
//     { $match: { isMemberShipDuePaid: true } },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalWelfareRevenue = await WelfareDues.aggregate([
//     { $match: { isWelfareDuePaid: true } },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalRevenueAmount =
//     (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

//   // Calculate membership dues paid
//   const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

//   // Calculate lifetime membership paid
//   const lifetimeMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: { isMemberShipDuePaid: true, membershipType: "Life membership" },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate annual membership paid
//   const annualMembershipPaid = await MembershipDues.aggregate([
//     {
//       $match: {
//         isMemberShipDuePaid: true,
//         membershipType: "Annual membership",
//       },
//     },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   // Calculate welfare dues paid
//   const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

//   // Get number of male and female users
//   const maleUsers = await User.countDocuments({ sex: "male" });
//   const femaleUsers = await User.countDocuments({ sex: "female" });

//   return {
//     totalRevenue: totalRevenueAmount,
//     membershipDuesPaid: totalMembershipDuesPaid,
//     lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
//     annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
//     welfareDuesPaid: welfareDuesPaid,
//     maleUsers: maleUsers,
//     femaleUsers: femaleUsers,
//   };
// };

// module.exports = {
//   getOverviewStats,
// };

//2nd
const getOverviewStats = async (year) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  // Calculate total revenue
  const totalRevenue = await MembershipDues.aggregate([
    {
      $match: {
        isMemberShipDuePaid: true,
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalWelfareRevenue = await WelfareDues.aggregate([
    {
      $match: {
        isWelfareDuePaid: true,
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalRevenueAmount =
    (totalRevenue[0]?.total || 0) + (totalWelfareRevenue[0]?.total || 0);

  // Calculate membership dues paid
  const totalMembershipDuesPaid = totalRevenue[0]?.total || 0;

  // Calculate lifetime membership paid
  const lifetimeMembershipPaid = await MembershipDues.aggregate([
    {
      $match: {
        isMemberShipDuePaid: true,
        membershipType: "Life membership",
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Calculate annual membership paid
  const annualMembershipPaid = await MembershipDues.aggregate([
    {
      $match: {
        isMemberShipDuePaid: true,
        membershipType: "Annual membership",
        paymentDate: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Calculate welfare dues paid
  const welfareDuesPaid = totalWelfareRevenue[0]?.total || 0;

  // Get number of male and female users
  const maleUsers = await User.countDocuments({ sex: "male" });
  const femaleUsers = await User.countDocuments({ sex: "female" });
  const totalMembers = await User.countDocuments();

  return {
    totalRevenue: totalRevenueAmount,
    membershipDuesPaid: totalMembershipDuesPaid,
    lifetimeMembershipPaid: lifetimeMembershipPaid[0]?.total || 0,
    annualMembershipPaid: annualMembershipPaid[0]?.total || 0,
    welfareDuesPaid: welfareDuesPaid,
    maleUsers: maleUsers,
    femaleUsers: femaleUsers,
    totalMembers: totalMembers,
  };
};

module.exports = {
  getOverviewStats,
};
