"use strict";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectDB from "./Mongodb/db.js";
import authRouter from "./Routes/auth.route.js";
import incomeRouter from "./Routes/Income.Routes.js";
import expenseRouter from "./Routes/Expense.Routes.js";
import dashboardRoutes from "./Routes/Dashboard.Routes.js";

// Load environment variables
dotenv.config();

// Setup __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/tracker/income", incomeRouter);
app.use("/api/tracker/expense", expenseRouter);
app.use("/api/tracker/dashboard", dashboardRoutes);

// Serve static files from Uploads directory
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
