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

const {
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  editSubscriptionServices,
  deleteSubscriptionServices,
  verifyPaymentServices,
} = require("./admin/subscriptionServices");

const {
  createEventService,
  getAllEventService,
  getSingleEventService,
  editEventService,
  deletEventService,
} = require("./admin/eventServices");

const getUserDetailsService = require("./admin/userServices");
const getUserSubscriptionServices = require("./admin/userSubscriptionServices");

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
  createSubscriptionServices,
  getAllSubscriptionServices,
  getSingleSubscriptionServices,
  editSubscriptionServices,
  deleteSubscriptionServices,
  createEventService,
  getAllEventService,
  getSingleEventService,
  editEventService,
  deletEventService,
  verifyPaymentServices,
  getUserDetailsService,
  getUserSubscriptionServices,
};
