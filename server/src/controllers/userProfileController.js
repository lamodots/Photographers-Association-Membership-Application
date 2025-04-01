const { StatusCodes } = require("http-status-codes");
const {
  userProfileServices,
  updateUserProfileServices,
} = require("../services");

const userProfileController = async (req, res) => {
  try {
    const user = await userProfileServices(req.params.userId);
    res.status(200).json({ sucess: true, data: user });
  } catch (error) {
    console.log(error);
  }
};
const updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    const userImage = req.files?.image;

    const updatedUser = await updateUserProfileServices(
      userId,
      userData,
      userImage
    );

    res.status(StatusCodes.OK).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

module.exports = { userProfileController, updateUserProfileController };
