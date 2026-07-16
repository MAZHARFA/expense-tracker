"use strict"
import express from "express";

import {
    addExpense,
    getAllExpense,
    deleteExpense,
    fileDownloadExpense,
} from "../controllers/expense.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router=express.Router();

router.post("/add",verifyToken,addExpense);

router.get("/get",verifyToken,getAllExpense);

router.post("/delete/:id",verifyToken,deleteExpense);

router.get("/download",verifyToken,fileDownloadExpense);


export default router;