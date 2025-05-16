import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // 🔐 Check if token exists
  if (!token) {
    return next(
      new ErrorHandler("Authentication required. Please log in!", 401)
    ); // 401 is more semantically accurate than 400
  }

  try {
    // 🔍 Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 👤 Attach user to request
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    next();
  } catch (error) {
    // 🛡️ Handle invalid token
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});
