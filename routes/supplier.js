import express from "express";
import mongoose from "mongoose";
import {
  getAllSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplierbyId,
} from "../controllers/supplier.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllSupplier);
router.get("/:id", verifyToken, getSupplierById);
router.post("/", verifyToken, createSupplier);
router.put("/:id", verifyToken, updateSupplier);
router.delete("/:id", verifyToken, deleteSupplierbyId);

export default router;
