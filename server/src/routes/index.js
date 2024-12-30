const adminAuthRoutes = require("./admin/adminAuthRoutes");
const adminUserRoute = require("./admin/userRoutes");
const appSettingsRoutes = require("./admin/appSettingsRoutes");
const announcementsRoutes = require("./admin/announcementsRoutes");
const subscriptionsRoutes = require("./admin/subscriptionsRoutes");
const eventRoutes = require("./admin/eventRoutes");

module.exports = {
  adminAuthRoutes,
  adminUserRoute,
  appSettingsRoutes,
  announcementsRoutes,
  subscriptionsRoutes,
  eventRoutes,
};
