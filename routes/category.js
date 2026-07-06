import express from "express";
import mongoose from "mongoose";
import {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategorybyId,
} from "../controllers/category.js";

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategorybyId);

export default router;
