import express from "express";
import mongoose from "mongoose";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
