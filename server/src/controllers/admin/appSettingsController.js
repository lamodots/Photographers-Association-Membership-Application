const { StatusCodes } = require("http-status-codes");
const {
  appSettingsServices,
  getAppSettingsServices,
} = require("../../services");
const { BadRequestError } = require("../../errors");

async function appSettingsController(req, res, next) {
  const body = req.body;
  console.log(body);
  if (!body) {
    return next(new BadRequestError("Add application settings!"));
  }
  await appSettingsServices(body);
  res
    .status(StatusCodes.OK)
    .json({ ok: true, message: "App settings updated successfully!" });
}

async function getAppSettingsController(req, res, next) {
  try {
    const appDetails = await getAppSettingsServices();

    res.status(StatusCodes.OK).json({ ok: true, appDetails });
  } catch (error) {
    return next(error);
  }
}
module.exports = { appSettingsController, getAppSettingsController };
