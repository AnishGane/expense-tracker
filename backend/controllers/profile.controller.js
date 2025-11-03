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

  try {
    const user = await userModel.findById(req.user.id);

    if (user) {
      user.fullName = fullName || user.fullName;
      user.profileImageUrl = profileImageUrl || user.profileImageUrl;
      await user.save();
      res.status(200).json({ user, message: "Profile updated successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in updating user profile",
      error: error.message,
    });
  }
};
