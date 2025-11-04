import userModel from "../models/User.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting user profile", error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  const { fullName, profileImageUrl } = req.body;
  console.log("Received body:", req.body);

  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;

    // If explicitly set to null, remove the image
    if (profileImageUrl === null) {
      user.profileImageUrl = "";
    } else if (profileImageUrl) {
      user.profileImageUrl = profileImageUrl;
    }

    await user.save();
    res.status(200).json({ user, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating user profile",
      error: error.message,
    });
  }
};
