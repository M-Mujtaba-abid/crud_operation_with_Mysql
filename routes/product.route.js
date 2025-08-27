import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controler.js";
import {productValidationErrorHandler, productValidation} from "../middleware/product.validatio.js"
 

const router = express.Router();

// ✅ Sirf login user product post kar sakta hai
router.post("/post",authenticate,productValidation ,productValidationErrorHandler, createProduct);


// ✅ koi bhi dekh sakta hai (agar sirf apne dekhne hain to isme bhi authenticate add karna hoga)
router.get("/get", authenticate, getAllProducts);

// ✅ Update/Delete ke liye user authenticated hona zaroori hai
router.patch("/update/:id", authenticate, productValidation,  productValidationErrorHandler,updateProduct);

router.delete("/delete/:id", authenticate, deleteProduct);

export default router;
