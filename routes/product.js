import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductbyId,
  addStock,
  removeStock,
} from "../controllers/product.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, upload.single("image"), createProduct);
router.put("/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, deleteProductbyId);
router.put("/stock/add", verifyToken, addStock);
router.put("/stock/remove", verifyToken, removeStock);

export default router;
