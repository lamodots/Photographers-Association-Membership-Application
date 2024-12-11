const {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
} = require("./admin/announcementController");
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
};
