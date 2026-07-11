import express from "express";
import {
  getAllReceipt,
  getReceiptById,
  calculateReceiptTotal,
  createReceipt,
  generateReport,
} from "../controllers/receipt.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllReceipt);
router.get("/report", verifyToken, generateReport);
router.get("/:id", verifyToken, getReceiptById);
router.post("/calculate-total", verifyToken, calculateReceiptTotal);
router.post("/", verifyToken, createReceipt);

export default router;
