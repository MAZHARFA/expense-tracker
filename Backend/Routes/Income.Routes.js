import express from "express";

import {
    addIncome,
    getAllIncome,
    deleteIncome,
    fileDownloadIncome
} from "../controllers/income.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router=express.Router();

router.post("/add",verifyToken,addIncome);

router.get("/get",verifyToken,getAllIncome);

router.post("/delete/:id", deleteIncome);


router.get("/download",verifyToken,fileDownloadIncome);


export default router;