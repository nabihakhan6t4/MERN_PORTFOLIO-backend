import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Skill title is required!"],
    trim: true,
    minLength: [2, "Skill title must be at least 2 characters long"],
  },
  proficiency: {
    type: Number,
    required: [true, "Proficiency is required!"],
    min: [0, "Minimum value is 0"],
    max: [100, "Maximum value is 100"],
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Skill = mongoose.model("Skill", skillSchema);
