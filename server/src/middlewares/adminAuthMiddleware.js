const isTokenValid = require("../utils/jwt");
const CustomError = require("../errors");

function authenticateUser(req, res, next) {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnAuthenticatedError("Authentication Invalid");
  }

  console.log("token", isTokenValid.isTokenValid(token));
  try {
    const { firstname, lastname, userId, role } = isTokenValid.isTokenValid({
      token,
    });
    console.log("user,", req.user);
    req.user = { firstname, lastname, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError("Authentication Invalid");
  }
}

function authorizaPermissions(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        " Unauthorized to access this route"
      );
    }
    next();
  };
}

module.exports = { authenticateUser, authorizaPermissions };
