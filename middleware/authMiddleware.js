import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";
dotenv.config()

console.log("ye rha secret" ,process.env.JWT_SECRET )
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Token from cookie:", token);

    if (!token) throw new ApiError(401, "No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = decoded; // attach payload to request
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
