// controllers/product.controller.js
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

// 🟢 Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock } = req.body;

  if (!title || !price || stock === undefined) {
    throw new ApiError(400, "Title, Price and Stock are required");
  }

  const product = await Product.create({
    title,
    description,
    price,
    stock,
    userId: req.user.id, // 👈 token se aaya hua user
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

// 🟡 Get All Products of Logged-in User
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({ where: { userId: req.user.id } }); // 👈 sirf apne products
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

// 🟠 Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock } = req.body;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // 👇 ownership check
  if (product.userId !== req.user.id) {
    throw new ApiError(403, "You are not allowed to update this product");
  }

  await product.update({ title, description, price, stock });

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

// 🔴 Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // 👇 ownership check
  if (product.userId !== req.user.id) {
    throw new ApiError(403, "You are not allowed to delete this product");
  }

  await product.destroy();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});
