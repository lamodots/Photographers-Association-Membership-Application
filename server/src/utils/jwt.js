const jwt = require("jsonwebtoken");

function createJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

function isTokenValid(token) {
  jwt.verify(token, process.env.JWT_SECRET);
}
function attachCookiesToResponse(res, user) {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: oneDay,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
}

module.exports = {
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
