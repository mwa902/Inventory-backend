import express from "express";
import mongoose from "mongoose";
import {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategorybyId,
} from "../controllers/category.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllCategory);
router.get("/:id", verifyToken, getCategoryById);
router.post("/", verifyToken, createCategory);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategorybyId);

export default router;
