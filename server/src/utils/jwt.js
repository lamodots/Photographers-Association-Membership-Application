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
//     // sameSite: "Strict", // use locally
//   });
// }
function attachCookiesToResponse(res, user) {
  // Generate token
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: oneDay,
    secure: true, // Always use secure in production
    signed: true,
    sameSite: "None", // Needed for cross-domain
    path: "/", // Make sure to specify the path
    domain:
      process.env.NODE_ENV === "production" ? ".membersng.com" : undefined, // Match your frontend domain
  });
}

module.exports = {
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
