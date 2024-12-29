import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./apiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new ApiError(400, "File path is required!");

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //  fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath);

    throw new ApiError(500, "Error while uploading file to cloudinary");
  }
};

export { uploadOnCloudinary };
