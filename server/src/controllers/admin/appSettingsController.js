const path = require("path");
const fs = require("fs");

const { StatusCodes } = require("http-status-codes");
const {
  appSettingsServices,
  getAppSettingsServices,
} = require("../../services");
const { BadRequestError } = require("../../errors");

/** APP SETTINGS CONTROLLER -  Adds app settings to database.**/
async function appSettingsController(req, res, next) {
  const { appname, paymentapi, whatsappapi, pagelink, sendgridapi } = req.body;

  if (!appname || !paymentapi || !whatsappapi || !sendgridapi) {
    return next(new BadRequestError("Add application settings!"));
  }

  try {
    const appLogoImage = req.files.applogo;
    if (!appLogoImage.mimetype.startsWith("image")) {
      return next(
        new BadRequestError(
          "The file you are trying to upload is not an image .Please upload image"
        )
      );
    }

    const maxSize = 2 * 1024 * 1024;
    if (appLogoImage.size > maxSize) {
      return next(new BadRequestError("Please upload image smaller than 2MB"));
    }

    // construct the folder (uploads) where we want to upload the image
    const uploadsDir = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "client",
      "public",
      "uploads"
    );

    // check if it exists if not create uploads folder
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Form a uniques name for the image
    const uniqueLogo =
      appLogoImage.name.split(".")[0] +
      appLogoImage.md5 +
      "." +
      appLogoImage.name.split(".")[1];

    //image path
    const imagePath = path.join(uploadsDir, uniqueLogo);
    await appLogoImage.mv(imagePath);

    await appSettingsServices({
      appname,
      paymentapi,
      whatsappapi,
      sendgridapi,
      applogo: uniqueLogo,
    });
    res
      .status(StatusCodes.OK)
      .json({ ok: true, message: "App settings updated successfully!" });
  } catch (error) {}
}

/** GET APP SETTINGS- Retrives application settings so it can be resdered in the UI **/
async function getAppSettingsController(req, res, next) {
  console.log(req?.user);
  try {
    const appDetails = await getAppSettingsServices();

    res.status(StatusCodes.OK).json({ ok: true, appDetails });
  } catch (error) {
    return next(error);
  }
}
module.exports = { appSettingsController, getAppSettingsController };
