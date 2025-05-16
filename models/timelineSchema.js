import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: Date,
      required: [true, "Start date is required"],
    },
    to: {
      type: Date,
      required: false, // optional if ongoing
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
