import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getDashboardData,
  getSmartInsights,
} from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getDashboardData);
dashboardRouter.get("/insights", protect, getSmartInsights);
export default dashboardRouter;
