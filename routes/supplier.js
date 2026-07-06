import express from "express";
import mongoose from "mongoose";
import {
  getAllSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplierbyId,
} from "../controllers/supplier.js";

const router = express.Router();

router.get("/", getAllSupplier);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplierbyId);

export default router;
