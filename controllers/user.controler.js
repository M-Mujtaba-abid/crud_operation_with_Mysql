import User from "../models/user.model.js";
import { comparePassword, hashPassword  } from "../utils/Encryption.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check email exists?
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, "Email already registered!");
  }

  // hash password
  const hashedPass = await hashPassword(password);

  // create new user
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });

  // response with ApiResponse
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});



export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check email provided hai ya nahi
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  // user find karo
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // password compare karo
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials!");
  }

  // (yahan pe future me JWT generate karke bhejna ho to wo bhi kar sakte ho)
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Login successful"));
});