import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
    });
    console.log(
      `✅ MongoDB connected! \nHost: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Optional: exits process if connection fails
  }
};
