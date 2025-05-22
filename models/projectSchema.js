import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    gitRepoLink: {
      type: String,
      required: [true, "GitHub repository link is required"],
    },
    projectLink: {
      type: String,
      required: [true, "Live project link is required"],
    },
    technologies: {
      type: [String], // 💡 Changed to array for better filtering/searching
      required: [true, "Technologies used are required"],
    },
    stack: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "MERN",
        "MEAN",
        "LAMP",
        "Serverless",
        "Mobile",
        "DevOps",
        "Data Science",
        "AI/ML",
        "Other",
      ],
      required: [true, "Project stack type is required"],
    },
    deployed: {
      type: String,
      enum: ["Netlify", "Vercel", "Heroku", "GitHub Pages", "Other"],
      default: "Other",
    },
    projectBanner: {
      public_id: {
        type: String,
        required: [true, "Project banner public_id is required"],
      },
      url: {
        type: String,
        required: [true, "Project banner URL is required"],
      },
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
