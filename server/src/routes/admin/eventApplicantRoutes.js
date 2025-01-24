const express = require("express");
const router = express.Router();
const applicantController = require("../../controllers");
const eventsRoute = require("./eventRoutes");

eventsRoute.post("/applicants", applicantController.createApplicant);
eventsRoute.put(
  "/applicants/:applicationId/m/approve",
  applicantController.approveApplicant
);
eventsRoute.get(
  "/:eventId/applicants",
  applicantController.getApplicantsByEvent
);
eventsRoute.put("/:eventId/applicant", applicantController.getApplicantByEvent);

// module.exports = router;
