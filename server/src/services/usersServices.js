const { sendEmailSendGridServices } = require("../config");
const { BadRequestError } = require("../errors");
const { sanitizeInput } = require("../utils/sanitizeInput");
const { User } = require("../models");
const crypto = require("crypto");
const {
  createTokenUser,
  sendResetPassswordEmailTemplate,
} = require("../utils");
const membershipID = require("../utils/generateUniqueMembershipId");

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

async function registerUserService(body) {
  try {
    const emailAlreadyExist = await User.findOne({ email: body.email });
    // check if user already exist
    if (emailAlreadyExist) {
      throw new BadRequestError("Email Already Exist");
    }

    const user = await User(body);
    await user.save();
    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new BadRequestError(error.message);
    } else {
      throw error;
    }
  }
}

const verifyEmailService = async (email, token) => {
  // Make sure token and email is not empty
  // Retrive token from database
  // // compare verificationToken with token
  // if they are equal, update isVeried to true and vefired to actuall date it was vefied

  // checks if email and token is available
  if (!email || !token) {
    throw new Error("No verification parameters");
  }
  const user = await User.findOne({ email });

  // Check if user exist
  if (!user) {
    throw new Error("Verification failed!");
  }

  if (user.verificationToken !== token) {
    throw new Error("Invalid verification token");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();

  return { ok: true, message: "Email verified successfully" };
};

// Onboarding Service logic
// const completeOnboardingService = async (email, userData) => {
//   console.log(userData);
//   // Validate step one data
//   if (
//     !userData.firstName ||
//     !userData.lastName ||
//     !userData.title ||
//     !userData.dateOfEntry ||
//     !userData.Dob ||
//     !userData.whatsappId
//   ) {
//     throw new Error("Please provide all required step one data.");
//   }

//   // Validate step two data
//   if (userData.familyInLagos) {
//     if (
//       !Array.isArray(userData.familyMembers) ||
//       userData.familyMembers.length === 0
//     ) {
//       throw new Error("Please provide family members data.");
//     }

//     userData.familyMembers.forEach((member) => {
//       if (
//         !member.firstName ||
//         !member.lastName ||
//         !member.title ||
//         !member.dateOfEntry ||
//         !member.emailId ||
//         !member.whatsappId ||
//         !member.relationship ||
//         !member.dateOfBirth
//       ) {
//         throw new Error("Please provide all required family member data.");
//       }
//     });
//   } else if (userData.familyMembers && userData.familyMembers.length > 0) {
//     throw new Error(
//       "Family members should not be provided if 'familyInLagos' is false."
//     );
//   }

//   // Validate step three data
//   if (
//     !userData.state ||
//     !userData.address ||
//     !userData.location ||
//     !userData.emergencyContactInIndia ||
//     !userData.districtInIndia ||
//     !userData.addressInIndia
//   ) {
//     throw new Error("Please provide all required step three data.");
//   }

//   const sanitizedData = sanitizeInput(userData);
//   // Process the user data (e.g., save to database)
//   try {
//     const updatedUser = await User.findOneAndUpdate({ email }, sanitizedData, {
//       new: true,
//     }); // Assuming User is a mongoose model

//     updatedUser.isOnboarded = true;
//     await updatedUser.save();
//     return updatedUser;
//   } catch (error) {
//     throw new Error("Error completing onboarding process: " + error.message);
//   }
// };
const completeOnboardingService = async (email, userData) => {
  const sanitizedData = sanitizeInput(userData);
  console.log("Sanitized Data:", sanitizedData);

  // Validate step one data
  if (
    !sanitizedData.firstname ||
    !sanitizedData.lastname ||
    !sanitizedData.title ||
    !sanitizedData.dateOfEntry ||
    !sanitizedData.Dob ||
    !sanitizedData.whatsappId
  ) {
    throw new Error("Please provide all required step one data.");
  }

  // Validate step two data
  if (sanitizedData.familyInLagos) {
    if (
      !Array.isArray(sanitizedData.familyMembers) ||
      sanitizedData.familyMembers.length === 0
    ) {
      throw new Error("Please provide family members data.");
    }

    sanitizedData.familyMembers.forEach((member, index) => {
      if (
        !member.firstName ||
        !member.lastName ||
        !member.title ||
        !member.dateOfEntry ||
        !member.emailId ||
        !member.whatsappId ||
        !member.relationship ||
        !member.dateOfBirth
      ) {
        throw new Error(
          `Family member ${index + 1} is missing required fields.`
        );
      }
    });
  } else if (
    sanitizedData.familyMembers &&
    sanitizedData.familyMembers.length > 0
  ) {
    throw new Error(
      "Family members should not be provided if 'familyInLagos' is false."
    );
  }

  // Validate step three data
  if (
    !sanitizedData.state ||
    !sanitizedData.address ||
    !sanitizedData.location ||
    !sanitizedData.emergencyContactInIndia ||
    !sanitizedData.districtInIndia ||
    !sanitizedData.addressInIndia
  ) {
    throw new Error("Please provide all required step three data.");
  }

  // Process the user data (e.g., save to database)
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { ...sanitizedData, memberId: membershipID },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw new Error("User not found.");
    }
    updatedUser.isOnboarded = true;
    await updatedUser.save();
    return updatedUser;
  } catch (error) {
    throw new Error("Error completing onboarding process: " + error.message);
  }
};

const userLoginService = async (email, password) => {
  // check  if fields are empty
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  // check if the user exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  // check if registered user password matches the submitted password  and //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  // check if user is veried
  if (!user.isVerified) {
    throw new Error("Please verify your email !");
  }
  // create tokenUser (part of the user ) used as payload
  // Helper function to create the token user payload

  const tokenUser = createTokenUser(user);

  return tokenUser;
};

const forgotUserPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email does not exist or invalid request");
  }

  const passwordToken = crypto.randomBytes(70).toString("hex");

  // Set token expiration (10 minutes from now)
  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

  // Hash the token
  const hashedPassword = crypto
    .createHash("md5")
    .update(passwordToken)
    .digest("hex");

  // update the user values passwordToken and toen expiration
  user.passwordToken = hashedPassword;
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  return user;
};

const resetUserPasswordService = async (email, token, password) => {
  // const hashedPassword = crypto.createHash("md5").update(token).digest("hex");
  // console.log(hashedPassword);
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid reset request");
  }

  // Validate the token and expiration date
  const currentDate = new Date();
  if (
    user.passwordToken !== token ||
    user.passwordTokenExpirationDate < currentDate
  ) {
    throw new Error("Invalid or expired token");
  }
  // Update the user's password and clear token fields
  user.password = password;
  user.passwordToken = null;
  user.passwordTokenExpirationDate = null;
  await user.save();
};
module.exports = {
  getAllUsersService,
  registerUserService,
  verifyEmailService,
  userLoginService,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
};
