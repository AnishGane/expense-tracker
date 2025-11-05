import multer from "multer";

// Using memoryStorage to keep files in memory as buffers
// This is more efficient for Cloudinary uploads since we don't need to save files to disk
const storage = multer.memoryStorage();

// File filter to only accept image files
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// This is the middleware function that will be used to handle the upload.
// It takes a single parameter, which is an object that specifies which fields in the request should be processed.
// In this case, we're specifying that we want to process a single field: image.
// Limits: 5MB max file size (Cloudinary free tier supports up to 10MB, but we'll limit to 5MB for safety)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  },
});

export default upload;

// Explanation ->
// This function is called for each file that is uploaded, and it determines the filename for the file.
// The function takes three parameters: the request object, the file object, and a callback function.
// The callback function takes two parameters: an error object (which should be null if everything is okay), and the filename that should be used for the file.

// We're simply using the original filename for the uploaded file.
// This is not a good idea in a real application, as it can lead to filename collisions.
// In a real application, you should generate a unique filename for each file.
