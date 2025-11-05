import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

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
          message: "File too large. Max size is 5MB.",
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
  async (req, res, next) => {
    try {
      if (!req.file) {
        console.log("No image uploaded");
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Validate that buffer exists
      if (!req.file.buffer) {
        console.error("File buffer is missing");
        return res.status(400).json({ message: "File buffer is missing" });
      }

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_images" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          // Handle stream errors (network errors like ENOTFOUND)
          stream.on("error", (streamError) => {
            console.error("Stream error:", streamError);
            reject(streamError);
          });

          // Create a readable stream from the buffer and pipe it to Cloudinary
          const readStream = streamifier.createReadStream(req.file.buffer);

          // Handle read stream errors
          readStream.on("error", (readError) => {
            console.error("Read stream error:", readError);
            reject(readError);
          });

          readStream.pipe(stream);
        });
      };

      const result = await streamUpload(req);
      console.log("✅ Cloudinary upload success:", result.secure_url);
      res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
      console.error("🔥 Upload error:", error);
      console.error("Error details:", {
        code: error.code,
        errno: error.errno,
        syscall: error.syscall,
        hostname: error.hostname,
        message: error.message,
      });

      // Check if response was already sent to prevent sending multiple responses
      if (!res.headersSent) {
        // Detect specific error types and provide user-friendly messages
        let errorMessage = "Unknown error occurred";
        let statusCode = 500;

        // Check for network/DNS errors
        if (error.code === "ENOTFOUND" || error.errno === -3008) {
          errorMessage =
            "Network error: Cannot connect to Cloudinary. Please check your internet connection and try again.";
          statusCode = 503; // Service Unavailable
          console.error(
            "❌ DNS resolution failed for Cloudinary. Check network connectivity."
          );
        } else if (error.code === "ECONNREFUSED") {
          errorMessage =
            "Connection refused: Cannot reach Cloudinary servers. Please try again later.";
          statusCode = 503;
        } else if (error.code === "ETIMEDOUT") {
          errorMessage =
            "Connection timeout: Cloudinary server took too long to respond. Please try again.";
          statusCode = 504; // Gateway Timeout
        } else if (error.message) {
          // Check if it's a Cloudinary API error
          if (
            error.message.includes("Invalid API Key") ||
            error.http_code === 401
          ) {
            errorMessage =
              "Cloudinary authentication failed. Please check your API credentials.";
            statusCode = 401;
          } else if (error.http_code === 400) {
            errorMessage = error.message || "Invalid request to Cloudinary.";
            statusCode = 400;
          } else {
            errorMessage = error.message;
          }
        } else {
          errorMessage = error?.toString() || "Unknown error occurred";
        }

        console.log(
          `📤 Sending error response: ${statusCode} - ${errorMessage}`
        );
        res.status(statusCode).json({
          message: "Server error during upload",
          error: errorMessage,
        });
      } else {
        console.error("⚠️ Response already sent, cannot send error response");
        // If headers were sent, pass error to Express error handler
        next(error);
      }
    }
  }
);

export default authRouter;
