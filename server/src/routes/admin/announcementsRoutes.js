const express = require("express");
const {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} = require("../../controllers");

const announcementsRoute = express.Router();

announcementsRoute.post("/", createAnnouncment);
announcementsRoute.get("/", getAllAnnoucements);
announcementsRoute.get("/:id", getSingleAnnouncement);
announcementsRoute.put("/:id", editAnnouncement);
announcementsRoute.delete("/:id", deleteAnnouncement);

module.exports = announcementsRoute;
