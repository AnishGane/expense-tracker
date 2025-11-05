import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No image uploaded");
      return res.status(400).json({ message: "No image uploaded" });
    }

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
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("🔥 Upload error:", error?.message || error);

    if (!res.headersSent) {
      let errorMessage = "Image upload failed. Please try again.";
      let statusCode = 500;

      if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
        statusCode = 503; // Service Unavailable
        errorMessage = "Network error. Please try again later.";
      } else if (error.code === "ETIMEDOUT") {
        statusCode = 504; // Gateway Timeout
        errorMessage = "Network timeout. Please try again.";
      } else if (error?.http_code === 401) {
        statusCode = 401;
        errorMessage = "Upload not authorized.";
      } else if (error?.http_code === 400) {
        statusCode = 400;
        errorMessage = "Bad upload request.";
      }

      return res.status(statusCode).json({
        message: errorMessage,
      });
    }

    return next(error);
  }
};
