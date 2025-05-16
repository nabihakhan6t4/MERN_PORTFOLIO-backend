import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Image is required!", 400)
    );
  }

  const { svg } = req.files;
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Please provide the software's name!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
    folder: "PORTFOLIO SOFTWARE APPLICATION IMAGES",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary upload error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }

  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const softwareApplication = await SoftwareApplication.findById(id);

  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application not found!", 404));
  }

  await cloudinary.uploader.destroy(softwareApplication.svg.public_id);
  await softwareApplication.deleteOne();

  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });
});

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();

  res.status(200).json({
    success: true,
    softwareApplications,
  });
});
