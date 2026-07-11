import express from "express";
import {
  getAllSupplier,
  getSupplierById,
  calculateSupplierTotal,
  createSupplier,
  updateSupplier,
  deleteSupplierbyId,
} from "../controllers/supplier.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllSupplier);
router.get("/:id", verifyToken, getSupplierById);
router.post("/calculate-total", verifyToken, calculateSupplierTotal);
router.post("/", verifyToken, createSupplier);
router.put("/:id", verifyToken, updateSupplier);
router.delete("/:id", verifyToken, deleteSupplierbyId);

export default router;
