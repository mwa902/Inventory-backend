import express from "express";
import mongoose from "mongoose";
import { getAllUsers } from "../controllers/user.js";
import { getUserById } from "../controllers/user.js";
import { createUser } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
import { deleteUsersbyId } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUsersbyId);

export default router;
