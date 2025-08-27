import express from "express";

import { registerUser  ,loginUser} from "../controllers/user.controler.js"
import { registerValidation , loginValidation, validationErrorHandler } from "../middleware/user.validation.js";
const route=express.Router()


route.post("/register" , registerValidation,  validationErrorHandler, registerUser)

route.post("/login" , loginValidation, validationErrorHandler, loginUser)


export default route