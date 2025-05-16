import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  // Validation: Required fields check
  if (!title || !description || !from || !to) {
    return next(new ErrorHandler("Please provide all timeline details!", 400));
  }

  // Create new timeline entry
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(201).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Find timeline by ID
  const timeline = await Timeline.findById(id);

  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  // Delete timeline
  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  // Fetch all timeline entries
  const timelines = await Timeline.find();

  res.status(200).json({
    success: true,
    timelines,
  });
});
