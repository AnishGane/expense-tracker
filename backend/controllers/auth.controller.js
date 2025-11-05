import jwt from "jsonwebtoken";
import validator from "validator";
import UserModel from "../models/User.model.js";

// Generate the json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a User
export const registerUser = async (req, res) => {
  // Safely handle missing/invalid body
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { fullName, email, password, profileImageUrl } = req.body || {};

  //   validate for any missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
        success: false,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // Create a new user
    // Only include profileImageUrl if it's provided and not empty
    const userData = {
      fullName,
      email,
      password,
    };

    if (profileImageUrl && profileImageUrl.trim() !== "") {
      userData.profileImageUrl = profileImageUrl;
    }

    const user = await UserModel.create(userData);

    // Remove password from user object before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      _id: user._id,
      user: userResponse,
      token: generateToken(user._id),
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in registering the user", error: error.message });
  }
};

// Login a User
export const loginUser = async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { email, password } = req.body || {};

  //   validate for any missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Remove password from user object before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      _id: user._id,
      user: userResponse,
      token: generateToken(user._id),
      message: "Login successful",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in logging in", error: error.message });
  }
};

// get user info
export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    // select() is the method in the mongoose to include or exclude fields
    // "-password" will exclude the password field

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting user info", error: error.message });
  }
};
