// import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/apiError.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("ye rha token",token)

    if (!token ) {
      throw new ApiError(401, "No token provided");
    }

    
    const decoded = verifyToken(token);
    
    req.user = decoded; // ab request me user ka data aa jayega
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
