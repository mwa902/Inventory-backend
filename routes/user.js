import express from "express";
import mongoose from "mongoose";
import { getAllUsers } from "../controllers/user.js";
import { getUserById } from "../controllers/user.js";
import { createUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { deleteUsersbyId } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUsersbyId);

export default router;
