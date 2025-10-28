import express from "express";
import { getExpenseForecast } from "../controllers/expenseforecast.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const expenseForecastRoute = express.Router();

expenseForecastRoute.get("/", protect, getExpenseForecast);
export default expenseForecastRoute;
