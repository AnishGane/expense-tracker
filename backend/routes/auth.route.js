import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/getUser", protect, getUserInfo);

// ========== CLOUDINARY UPLOAD ROUTE ==========
authRouter.post(
  "/upload-image",
  upload.single("image"),
  // Error handling middleware for multer errors
  (err, req, res, next) => {
    if (err) {
      console.error("Multer error:", err);
      // File too large
      if (err.name === "MulterError" && err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
          message: "File too large. Max size is 4MB.",
          error: err.message,
        });
      }
      // Invalid file type
      if (err.message === "Only image files are allowed!") {
        return res.status(400).json({
          message: "Invalid file type. Only images are allowed.",
          error: err.message,
        });
      }
      return res.status(400).json({
        message: "File upload error",
        error: err.message || "Invalid file upload",
      });
    }
    next();
  },
  uploadImage
);

export default authRouter;
