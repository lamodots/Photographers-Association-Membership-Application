const mongoose = require("mongoose");
const { WelfareDues, MembershipDues } = require("../models");

const approveMembershipWelfareDuesServices = async (
  userId,
  userEmail,
  first_name,
  last_name,
  isWelfareDuePaid,
  paymentMethod,
  paymentReference,
  channel,
  account_name,
  bank
) => {
  console.log(userId);
  if (!userId) {
    throw new Error("No approval parameters");
  }
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("ID dose not exist");
  }
  try {
    const isUser = await WelfareDues.find({ userId });
    if (!isUser) {
      throw new Error("User does not exist");
    }

    /*MARCH TO MARCH
    it should be even if a member pays for an annual membership a few days before March 1, the expiration date will be set to March 1 of the same year .
    else it should be set to March the following year
    */

    // const currentYear = new Date().getFullYear();
    // const currentDate = new Date();
    // const marchFirstThisYear = new Date(currentYear, 2, 1);

    // const isBeforeMarchFirst = currentDate < marchFirstThisYear;

    // const expiryDate = isBeforeMarchFirst
    //   ? marchFirstThisYear // March 1 of the same year
    //   : new Date(currentYear + 1, 2, 1); // March 1 of the next year
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const lastDayOfFebruaryThisYear = new Date(currentYear, 2, 0);

    const isBeforeFebuaryTwentyEight =
      currentDate < new Date(currentYear, 2, 1);

    const expiryDate = isBeforeFebuaryTwentyEight
      ? lastDayOfFebruaryThisYear // Last day of February of the same year
      : new Date(currentYear + 1, 2, 0); // Last day of February of the next year

    const duesInfo = {
      userId: userId,
      email: userEmail,
      full_name: `${first_name} ${last_name}`,
      startDate: currentDate,
      expiryDate: expiryDate,
      status: "active",
      isWelfareDuePaid: isWelfareDuePaid,
      paymentMethod: paymentMethod,
      paymentReference,
      channel,
      account_name,
      bank,
    };
    const userWelfareDues = await WelfareDues(duesInfo);
    userWelfareDues.save();
    return userWelfareDues;
  } catch (error) {
    throw new Error("Error creating welfare: " + error.message);
  }
};

/**MEMBERSHIP DUES SERVICES */
const approveMembershipDuesServices = async (
  userId,
  email,
  first_name,
  last_name,
  isMemberShipDuePaid,
  paymentMethod,
  paymentReference,
  channel,
  account_name,
  bank
) => {
  console.log(userId);
  if (!userId) {
    throw new Error("No approval parameters");
  }
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("ID dose not exist");
  }
  try {
    const isUser = await WelfareDues.find({ userId });
    if (!isUser) {
      throw new Error("User does not exist");
    }

    /*MARCH RO MARCH
    *it should be even if a member pays for an annual membership a few days before March 1, the expiration date will be set to March 1 of the same year .
    else it should be set to March the following year
    */

    // const currentYear = new Date().getFullYear();
    // const currentDate = new Date();
    // const marchFirstThisYear = new Date(currentYear, 2, 1);

    // const isBeforeMarchFirst = currentDate < marchFirstThisYear;

    // const expiryDate = isBeforeMarchFirst
    //   ? marchFirstThisYear // March 1 of the same year
    //   : new Date(currentYear + 1, 2, 1); // March 1 of the next year

    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const lastDayOfFebruaryThisYear = new Date(currentYear, 2, 0);

    const isBeforeFebuaryTwentyEight =
      currentDate < new Date(currentYear, 2, 1);

    const expiryDate = isBeforeFebuaryTwentyEight
      ? lastDayOfFebruaryThisYear // Last day of February of the same year
      : new Date(currentYear + 1, 2, 0); // Last day of February of the next year

    const duesInfo = {
      userId: userId,
      email,
      first_name,
      last_name,
      startDate: currentDate,
      expiryDate: expiryDate,
      status: "active",
      isMemberShipDuePaid: isMemberShipDuePaid,
      paymentReference: paymentReference,
      paymentMethod: paymentMethod,
      channel: channel,
      account_name: account_name,
      bank: bank,
    };
    const userMemberShipDues = await MembershipDues(duesInfo);
    userMemberShipDues.save();
    return userMemberShipDues;
  } catch (error) {
    throw new Error("Error creating welfare: " + error.message);
  }
};

const getAPersonWelfarePaymentsServices = async (userId) => {
  try {
    const userWelfares = await WelfareDues.find({ userId });

    return userWelfares;
  } catch (error) {
    throw new Error("Error retriving user welfare dues");
  }
};
const getAPersonMembershipPaymentsServices = async (userId) => {
  try {
    const userMemberShipDues = await MembershipDues.find({ userId });
    return userMemberShipDues;
  } catch (error) {
    throw new Error("Error retriving user membership dues");
  }
};

// Fetch all Dues payments
const fetchPayments = async (Model, filter, skip, parsedLimit) => {
  try {
    return await Model.find(filter).skip(skip).limit(parsedLimit);
  } catch (error) {
    throw new Error(
      `Failed to retrieve ${Model.modelName.toLowerCase()} payments`
    );
  }
};
const fetchAllMembershipPaymentsService = (filter, skip, parsedLimit) => {
  return fetchPayments(MembershipDues, filter, skip, parsedLimit);
};

const fetchAllWelfarePaymentsService = (filter, skip, parsedLimit) => {
  console.log("WELFARE SERVICES");
  console.log(filter, parsedLimit, skip);
  return fetchPayments(WelfareDues, filter, skip, parsedLimit);
};

module.exports = {
  approveMembershipWelfareDuesServices,
  approveMembershipDuesServices,
  getAPersonWelfarePaymentsServices,
  getAPersonMembershipPaymentsServices,
  fetchAllMembershipPaymentsService,
  fetchAllWelfarePaymentsService,
};
