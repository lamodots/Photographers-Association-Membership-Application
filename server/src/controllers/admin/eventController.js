const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const {
  createEventService,
  getAllEventService,
  getSingleEventService,
  deletEventService,
  editEventService,
} = require("../../services");
const mongoose = require("mongoose");

async function createEvents(req, res, next) {
  console.log(req.body);
  const { title, startDate, endDate, photoImage, description } = req.body;
  if (!title || !startDate || !endDate || !description) {
    return next(new BadRequestError("All fileds are required"));
  }
  try {
    const event = await createEventService({
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      photoImage: photoImage,
      createdBy: req.user.userId,
    });

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "New Event Added",
      event,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllEvents(req, res, next) {
  const event = await getAllEventService();

  if (event.length == []) {
    return res.status(StatusCodes.OK).json({ ok: true, message: "No Event" });
  }
  res.status(StatusCodes.OK).json({ ok: true, event });
}

async function getSingleEvent(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const event = await getSingleEventService(id);

    res.status(StatusCodes.OK).json({ ok: true, event });
  } catch (error) {
    return next(error);
  }
}

async function editEvent(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    const event = await editEventService(id, body);

    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "Event Edited", event });
  } catch (error) {
    return next(error);
  }
}
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("ID is not a valid ID"));
    }
    await deletEventService(id);

    res.status(StatusCodes.OK).json({ ok: true, message: "Event Deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createEvents,
  getAllEvents,
  getSingleEvent,
  editEvent,
  deleteEvent,
};
