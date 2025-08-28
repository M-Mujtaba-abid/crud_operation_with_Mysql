import Joi from "joi";

// 1️⃣ Register Validation
export const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userRole: Joi.string().min(2).max(50).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return next({ status: 400, message: error.details.map(e => e.message).join(", ") });
  next();
};

// 2️⃣ Login Validation
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return next({ status: 400, message: error.details.map(e => e.message).join(", ") });
  next();
};

// 3️⃣ Error handler middleware
export const validationErrorHandler = (err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).json({ success: false, message: err.message });
  }
  next(err); // pass to next error handler
};
