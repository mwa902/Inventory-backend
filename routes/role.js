import express from "express";

import { getAllRoles } from "../controllers/role.js";
import { getRolesbyId } from "../controllers/role.js";
import { createRoles } from "../controllers/role.js";
import { updateRoles } from "../controllers/role.js";
import { deleteRolesbyId } from "../controllers/role.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllRoles);
router.get("/:id", verifyToken, getRolesbyId);
router.post("/", verifyToken, createRoles);
router.put("/:id", verifyToken, updateRoles);
router.delete("/:id", verifyToken, deleteRolesbyId);

export default router;
