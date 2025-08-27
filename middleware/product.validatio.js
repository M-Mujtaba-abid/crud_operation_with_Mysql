import Joi from "joi";
import ApiError from "../utils/apiError.js";

// 1️⃣ Create / Update Product Validation
export const productValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(150).required(),
    description: Joi.string().allow("", null), // optional
    price: Joi.number().min(0).required(),
    stock: Joi.number().integer().min(0).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(new ApiError(
      400,
      error.details.map(e => e.message).join(", ")
    ));
  }
  next();
};

// 2️⃣ Error handler middleware for product validation
export const productValidationErrorHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).json({ success: false, message: err.message });
  }
  next(err); // pass to next error handler
};
