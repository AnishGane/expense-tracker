import express from "express";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/income.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", protect, addIncome);
incomeRouter.get("/get", protect, getAllIncome);
incomeRouter.delete("/:id", protect, deleteIncome);
incomeRouter.get("/downloadexcel", protect, downloadIncomeExcel);

export default incomeRouter;
