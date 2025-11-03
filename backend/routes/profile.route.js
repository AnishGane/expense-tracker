import expess from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/profile.controller.js";

const profileRouter = expess.Router();

profileRouter.get("/", protect, getUserProfile);
profileRouter.put("/update", protect, updateUserProfile);

export default profileRouter;
