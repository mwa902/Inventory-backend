import express from "express";
import mongoose from "mongoose";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  confirmOrder,
} from "../controllers/order.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllOrders);
router.get("/:id", verifyToken, getOrderById);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyToken, confirmOrder);

export default router;
