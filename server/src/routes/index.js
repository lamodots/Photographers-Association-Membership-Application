const adminAuthRoutes = require("./admin/adminAuthRoutes");
const adminUserRoute = require("./admin/userRoutes");
const appSettingsRoutes = require("./admin/appSettingsRoutes");
const announcementsRoutes = require("./admin/announcementsRoutes");
const subscriptionsRoutes = require("./admin/subscriptionsRoutes");
const eventRoutes = require("./admin/eventRoutes");
const eventApplicantRoute = require("./admin/eventApplicantRoutes");

module.exports = {
  adminAuthRoutes,
  adminUserRoute,
  appSettingsRoutes,
  announcementsRoutes,
  subscriptionsRoutes,
  eventRoutes,
  eventApplicantRoute,
};
