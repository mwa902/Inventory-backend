import express from "express";
import mongoose from "mongoose";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductbyId,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductbyId);

export default router;
