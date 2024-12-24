const {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
} = require("./admin/announcementController");
const {
  createSubscriptions,
  getAllSubscriptions,
  getSingleSubscriptions,
  deleteSubscriptions,
  editSubscriptions,
  verifyPayment,
} = require("./admin/subscriptionsController");
const {
  addAdminController,
  loginAdminController,
  logOutController,
  currentUserController,
} = require("./admin/adminAuthController");
const {
  appSettingsController,
  getAppSettingsController,
} = require("./admin/appSettingsController");

const {
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
} = require("./admin/eventController");
module.exports = {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  addAdminController,
  loginAdminController,
  currentUserController,
  logOutController,
  appSettingsController,
  getAppSettingsController,
  createSubscriptions,
  getAllSubscriptions,
  getSingleSubscriptions,
  deleteSubscriptions,
  editSubscriptions,
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
  verifyPayment,
};
