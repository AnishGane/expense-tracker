import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/getUser", protect, getUserInfo);

// Route for uploading images
authRouter.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Full URL for uploaded image
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageUrl });
});

export default authRouter;
