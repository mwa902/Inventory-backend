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

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductbyId);
router.put("/:id", addStock);
router.put("./:id", removeStock);

export default router;
