import express from "express";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
  downloadIncomePDF,
} from "../controllers/income.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", protect, addIncome);
incomeRouter.get("/get", protect, getAllIncome);
incomeRouter.delete("/:id", protect, deleteIncome);
incomeRouter.get("/downloadexcel", protect, downloadIncomeExcel);
incomeRouter.get("/downloadpdf", protect, downloadIncomePDF);

export default incomeRouter;
