import express from "express";
import { getExpenseInsights } from "../controllers/insight.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const insightRouter = express.Router();

insightRouter.get("/", protect, getExpenseInsights);
export default insightRouter;
