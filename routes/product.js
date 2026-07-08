import express from "express";
import mongoose from "mongoose";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductbyId,
  addStock,
  removeStock,
} from "../controllers/product.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProductbyId);
router.put("/:id", verifyToken, addStock);
router.put("./:id", verifyToken, removeStock);

export default router;
