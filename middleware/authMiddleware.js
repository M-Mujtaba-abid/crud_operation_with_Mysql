import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/apiError.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded; // ab request me user ka data aa jayega
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
