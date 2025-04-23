const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

const acceptableFileTypes = ["jpeg", "jpg", "gif", "png"];

/**
 * Validates if the file has an acceptable extension
 * @param {Object} file - The file object to validate
 * @param {String} fileLabel - A label to identify the file in error messages
 */
function validateFileType(file, fileLabel) {
  const fileExtension = file.name.split(".")[1];

  if (!acceptableFileTypes.includes(fileExtension)) {
    throw new Error(`File type not acceptable in ${fileLabel}`);
  }
}

/**
 * Prepares filename by removing spaces and adding a unique identifier
 * @param {String} filename - The original filename
 * @returns {String} - The prepared filename
 */
function prepareFilename(filename) {
  // Replace spaces
  let cleanedFilename = filename;
  if (filename.includes(" ")) {
    cleanedFilename = filename.split(" ").join("");
  }

  // Add unique identifier
  return `${cleanedFilename}-${crypto.randomBytes(8).toString("hex")}`;
}

/**
 * Uploads a file to Cloudinary
 * @param {Object} file - The file to upload
 * @returns {String} - The secure URL of the uploaded file
 */
async function uploadToCloudinary(file) {
  const displayName = prepareFilename(file.name);

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: "ads-photo",
      public_id: displayName,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to cloud storage");
  }
}

module.exports = {
  validateFileType,
  prepareFilename,
  uploadToCloudinary,
};
