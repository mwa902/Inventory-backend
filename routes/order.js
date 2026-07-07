import express from "express";
import mongoose from "mongoose";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderbyId,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrderbyId);

export default router;
