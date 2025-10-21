import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { isValidObjectId, Types } from "mongoose";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getDashboardData);
export default dashboardRouter;
