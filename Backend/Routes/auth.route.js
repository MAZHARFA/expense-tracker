"use strict";
import express from "express";
import {
  signup,
  logIn,
  logout,
  verifyEmail,
  forgotPassword,
  newPassword,
  userProfile,
  Image,
 
} from "../controllers/auth.controller.js";

import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.get("/get-user", verifyToken, userProfile);

router.post("/signup", signup);
router.post("/login", logIn);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/new-password/:Token", newPassword);

router.post("/upload-image",Image);
export default router;
