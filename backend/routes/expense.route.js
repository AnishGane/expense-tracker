import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", protect, addExpense);
expenseRouter.get("/get", protect, getAllExpense);
expenseRouter.delete("/:id", protect, deleteExpense);
expenseRouter.get("/downloadexcel", protect, downloadExpenseExcel);

export default expenseRouter;
