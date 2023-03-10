import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { catchAsyncError } from "./catchAsyncError.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) return next(new ErrorHandler("plessss login first ", 401));
  const decodedata = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedata);
  req.user = await User.findById(decodedata._id);
  next();
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};

export const authorizeSubscribers = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only Subscriber can access this resource`, 403)
    );
  next();
};
