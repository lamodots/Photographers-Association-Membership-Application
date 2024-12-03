const { StatusCodes } = require("http-status-codes");
const adminAuthServices = require("../services/adminAuthServices");
const { BadRequestError } = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");

async function addAdminController(req, res, next) {
  const {
    image,
    firstname,
    lastname,
    email,
    password,
    Dob,
    phone,
    location,
    address,
    aboutuser,
    social,
    interest,
  } = req.body;

  try {
    if (!firstname || !lastname || !password || !email) {
      return next(
        new BadRequestError(
          "firstname, lastname, password and email must not be empty!"
        )
      );
    }

    let role = "user";
    if (req.user && req.user.role === "admin") {
      // Admin can assign "admin" role
      role = req.body.role === "admin" ? "admin" : "user"; // Ensure only admins can set role to "admin"
    }
    await adminAuthServices.addAdminUserService({
      image,
      firstname,
      lastname,
      email,
      password,
      Dob,
      phone,
      location,
      address,
      aboutuser,
      social,
      interest,
      role,
    });
    res.status(StatusCodes.CREATED).json({
      ok: true,
      message: "New user added successfully",
    });
  } catch (error) {
    return next(error);
  }
}

async function loginAdminController(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new BadRequestError("Please provide email and password"));
    }
    // Return user token from login services
    const tokenUser = await adminAuthServices.loginAdminServices(
      email,
      password
    );

    // attach user token to cookie response pass down res to enable you access res.cookie
    attachCookiesToResponse(res, tokenUser);
    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "User logged in successfull" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { addAdminController, loginAdminController };
