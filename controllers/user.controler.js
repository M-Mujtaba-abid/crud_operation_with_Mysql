import User from "../models/user.model.js";
import { comparePassword, hashPassword  } from "../utils/Encryption.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
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

  // check user exists?
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // compare password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials!");
  }

  // generate token with payload (id, email etc)
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // response with token
  return res.status(200).json(
    new ApiResponse(
      200,
      { user, token },
      "Login successful"
    )
  );
});