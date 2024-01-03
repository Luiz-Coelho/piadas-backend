const User = require("../models/User");
const { uploadFile } = require("../config/s3");

exports.getUser = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const newUserData = req.body;

    if (!id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.file) {
      newUserData.profilePicture = await uploadFile(req.file);
    }

    const updatedUser = await User.findByIdAndUpdate(id, newUserData);

    if (!updatedUser) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    return res.status(200).json({ updatedUser, msg: "User updated" });
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};
