import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { logIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", logIn);

router.get("/get-data", verifyToken, getDashboardData);

export default router;
