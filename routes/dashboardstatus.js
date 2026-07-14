import getAllData from "../controllers/dashboardstatus.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllData);

export default router;