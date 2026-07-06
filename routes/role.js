import express from "express";
import mongoose from "mongoose";
import { getAllRoles } from "../controllers/role.js";
import { getRolesbyId } from "../controllers/role.js";
import { createRoles } from "../controllers/role.js";
import { updateRoles } from "../controllers/role.js";
import { deleteRolesbyId } from "../controllers/role.js";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRolesbyId);
router.post("/", createRoles);
router.put("/:id", updateRoles);
router.delete("/:id", deleteRolesbyId);

export default router;
