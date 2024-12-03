const express = require("express");
const {
  addAdminController,
  loginAdminController,
} = require("../controllers/adminAuthController");
const { authenticateUser } = require("../middlewares/adminAuthMiddleware");

const adminRoute = express.Router();

adminRoute.post("/login", loginAdminController);

adminRoute.post("/add", addAdminController);

adminRoute.post("/forgot-password", (req, res) => {
  console.log("Admin forgot password");
  res.json({ ok: true });
});

adminRoute.post("/reset-password", (req, res) => {
  console.log("Reset password");
  res.json({ ok: true });
});
module.exports = adminRoute;
