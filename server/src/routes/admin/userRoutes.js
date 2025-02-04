const express = require("express");
const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const { getUserProfileDetails } = require("../../controllers");

const adminUserRoute = express.Router();

adminUserRoute.get(
  "/",
  authenticateUser,
  authorizaPermissions("admin", "moderator"),
  getUserProfileDetails
);

module.exports = adminUserRoute;
