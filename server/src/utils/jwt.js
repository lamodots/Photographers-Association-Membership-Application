const jwt = require("jsonwebtoken");

// Generate access and refresh tokens
function createJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
    // expiresIn: "120000",
  });
  console.log("From create Token", token);
  return token;
}

function isTokenValid(token) {
  console.log("from verify token", jwt.verify(token, process.env.JWT_SECRET));
  console.log("from verify token", token);

  return jwt.verify(token, process.env.JWT_SECRET);
}

// function attachCookiesToResponse(res, user) {
//   // Generate access and refresh tokens
//   const token = createJWT({ payload: user });

//   // const oneDay = 1000 * 60 * 60 * 24;
//   const oneDay = 1000 * 60 * 60 * 24;

//   const sameSiteOption =
//     process.env.NODE_ENV === "production" ? "None" : "Strict";
//   res.cookie("token", token, {
//     httpOnly: true,
//     maxAge: oneDay,
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//     sameSite: sameSiteOption,
//     path: "/",
//     // sameSite: "Strict", // use locally
//   });
// }
/**PROD */
function attachCookiesToResponse(res, user) {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  // For cross-domain cookies in production, sameSite must be 'None' and secure must be true
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: oneDay,
    secure: true, // Must be true for SameSite=None
    signed: true,
    sameSite: "None", // Required for cross-domain cookies
    path: "/", // Make available on all paths
    // Don't set domain - let the browser handle it based on the responder
  });
}
module.exports = {
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
