import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../models/skillSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image for skill is required!", 400));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return next(new ErrorHandler("Please fill all required fields!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
    folder: "PORTFOLIO SKILL IMAGES",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload skill image to Cloudinary", 500));
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Skill Added!",
    skill,
  });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);

  if (!skill) {
    return next(new ErrorHandler("Skill already deleted or not found!", 404));
  }

  await cloudinary.uploader.destroy(skill.svg.public_id);
  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { proficiency } = req.body;

  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }

  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skill,
  });
});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();

  res.status(200).json({
    success: true,
    skills,
  });
});
