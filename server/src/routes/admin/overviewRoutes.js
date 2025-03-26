const express = require("express");

const { authenticateUser, authorizaPermissions } = require("../../middlewares");
const { getOverview } = require("../../controllers/admin/overviewController");

const overviewRoutes = express.Router();

overviewRoutes.get(
  "/",
  authenticateUser,
  authorizaPermissions("admin"),
  getOverview
);

module.exports = overviewRoutes;
