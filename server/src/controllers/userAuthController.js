const { StatusCodes } = require("http-status-codes");

const { BadRequestError } = require("../errors");
const {
  registerUserService,
  verifyEmailService,
  userLoginService,
  forgotUserPasswordService,
  resetUserPasswordService,
  completeOnboardingService,
} = require("../services");
const {
  verifyUserEmailTemplate,
  sendResetPassswordEmailTemplate,
} = require("../utils/emailTemplate");
const { sendEmailSendGridServices } = require("../config");
const crypto = require("crypto");
const { User } = require("../models");
const { attachCookiesToResponse } = require("../utils/jwt");
const { string } = require("yup");

const fullUrl = process.env.PROTOCOL_HOST;

const registerUserController = async (req, res, next) => {
  // const fullUrl = `${req.protocol}://${req.get("host")}`;

  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(new BadRequestError("Fields cannot be empty"));
  }

  if (password !== confirmPassword) {
    return next(new BadRequestError("Passwords do not match"));
  }

  try {
    const verificationToken = crypto.randomBytes(40).toString("hex");

    const newUser = await registerUserService({
      email,
      password,
      verificationToken,
    });

    const verifyTemplate = verifyUserEmailTemplate(
      fullUrl,
      newUser.email,
      newUser.verificationToken
    );
    await sendEmailSendGridServices(verifyTemplate);
    return res
      .status(StatusCodes.CREATED)
      .json({ ok: true, message: "User created sucessfully" });
  } catch (error) {
    return next(error);
  }
};

const verifyEmailController = async (req, res, next) => {
  const { token, email } = req.body;

  try {
    const result = await verifyEmailService(email, token);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "No verification parameters") {
      return next(new BadRequestError("No verification parameters"));
    }
    if (error.message === "User not found") {
      return next(new BadRequestError("Verification failed!"));
    }
    if (error.message === "Invalid verification token") {
      return next(new BadRequestError("Verification failed!"));
    }
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Call the service to get thetokenUserPayload token user payload
    const tokenUserPayload = await userLoginService(email, password);

    // Attach tokens to cookies
    attachCookiesToResponse(res, tokenUserPayload);

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "User logged in successfull",
      user: tokenUserPayload,
    });
  } catch (error) {
    if (error.message === "Please provide email and password") {
      return next(new BadRequestError("Please provide email and password"));
    }
    if (error.message === "Invalid credentials") {
      return next(new BadRequestError("Invalid email or password"));
    }
    if (error.message === "Please verify your email") {
      return next(new BadRequestError("Please verify your email to login"));
    }
    next(error);
  }
};

// Onboarding logic
const completeOnboarding = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  // Extract user data from the request body
  const userData = req.body;
  // Parse familyMembers if it's a JSON string
  if (typeof userData.familyMembers === "string") {
    userData.familyMembers = JSON.parse(userData.familyMembers);
  }
  try {
    // Call the onboarding service to complete the onboarding process
    const user = await completeOnboardingService(email, userData);

    // Return the updated user data in the response
    return res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      user,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// user Logout
const logOutUserController = async (req, res) => {
  res.cookies("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ ok: true, message: "user logged out" });
};

const forgotUserPasswordController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new BadRequestError("Please provide valid email"));
  }
  try {
    //check user
    const user = await forgotUserPasswordService(email);
    const fullUrl = `http://localhost:3000`;
    // send reset email

    const msg = sendResetPassswordEmailTemplate(
      user.passwordToken,
      fullUrl,
      user.email
    );
    await sendEmailSendGridServices(msg);

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Please check your email for reset password link",
    });
  } catch (error) {
    if (error.message === "Email does not exist or invalid request") {
      return next(new BadRequestError("Email does not exist. invalid request"));
    }
    next(error);
  }
};
const resetUserPasswordController = async (req, res, next) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    return next(new BadRequestError("Please provide all values"));
  }

  try {
    await resetUserPasswordService(email, token, password);
    // Send success response
    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Password reset successful",
    });
  } catch (error) {
    // Map generic errors to HTTP-specific errors
    if (error.message === "Invalid reset request") {
      return next(new BadRequestError("Invalid email or reset request"));
    }
    if (error.message === "Invalid or expired token") {
      return next(new BadRequestError("Invalid or expired token"));
    }
    next(error);
  }
};

module.exports = {
  verifyEmailController,
  registerUserController,
  loginUserController,
  logOutUserController,
  forgotUserPasswordController,
  resetUserPasswordController,
  completeOnboarding,
};
