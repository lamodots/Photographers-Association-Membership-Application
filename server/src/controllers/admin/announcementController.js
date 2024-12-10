const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const {
  createAnnouncmentsService,
  getAllAnnouncmentsService,
  getSingleAnnouncmentService,
  deletAnnouncmentService,
} = require("../../services");
const mongoose = require("mongoose");

async function createAnnouncment(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new BadRequestError("Title and description required");
  }

  try {
    const announcement = await createAnnouncmentsService({
      title: title,
      description: description,
    });

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "New Announcement Added",
      announcement,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllAnnoucements(req, res, next) {
  const announcements = await getAllAnnouncmentsService();
  console.log(announcements);
  if (announcements.length == []) {
    return res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "No Announcement" });
  }
  res.status(StatusCodes.OK).json({ ok: true, announcements });
}

async function getSingleAnnouncement(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const announcement = await getSingleAnnouncmentService(id);

    res.status(StatusCodes.OK).json({ ok: true, announcement });
  } catch (error) {
    return next(error);
  }
}

async function editAnnouncement(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const announcement = await deletAnnouncmentService(id);

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Announcement Deleted" });
  } catch (error) {
    return next(error);
  }
}
async function deleteAnnouncement(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    await deletAnnouncmentService(id);

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Announcement Deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createAnnouncment,
  getAllAnnoucements,
  getSingleAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
};
