const {
  addAdminUserService,
  loginAdminServices,
} = require("./admin/adminAuthServices");
const {
  appSettingsServices,
  getAppSettingsServices,
} = require("./admin/appSettingsServices");

const {
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  editAnnouncmentService,
  deletAnnouncmentService,
} = require("./admin/announcementServices");

module.exports = {
  addAdminUserService,
  loginAdminServices,
  appSettingsServices,
  getAppSettingsServices,
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  editAnnouncmentService,
  deletAnnouncmentService,
};
