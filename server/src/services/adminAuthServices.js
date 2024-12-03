const { BadRequestError } = require("../errors");
const UnAuthenticatedError = require("../errors/unAuthenticated-error");
const User = require("../models/usersModel");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");

async function addAdminUserService(body) {
  try {
    const emailAlreadyExist = await User.findOne({ email: body.email });

    if (emailAlreadyExist) {
      throw new BadRequestError("Email Already Exist");
    }

    if (
      body.role &&
      body.role !== "user" &&
      body.role !== "admin" &&
      body.role !== "moderator"
    ) {
      throw new BadRequestError("Invalid role specified.");
    }
    const user = new User(body);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function loginAdminServices(email, password) {
  const user = await User.findOne({ email });

  try {
    if (!user) {
      throw new UnAuthenticatedError("Invalid Credential");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Invalid Credential");
    }

    const tokenUser = createTokenUser(user);
    return tokenUser;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addAdminUserService,
  loginAdminServices,
};
