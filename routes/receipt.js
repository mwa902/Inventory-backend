import express from "express";
import mongoose from "mongoose";
import {
  getAllReceipt,
  getReceiptById,
  createReceipt,
  generateReport,
} from "../controllers/receipt.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllReceipt);
router.get("/:id", verifyToken, getReceiptById);
router.post("/", verifyToken, createReceipt);
router.get("/", verifyToken, generateReport);

export default router;
