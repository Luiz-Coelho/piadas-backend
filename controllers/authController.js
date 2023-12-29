const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../config/s3");

const maxAge = 7 * 24 * 60 * 60 * 1000;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: maxAge });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  let profilePicture;

  if (req.file) {
    profilePicture = await uploadFile(req.file);
  }

  try {
    const user = await User.create({
      profilePicture,
      name,
      email,
      password,
    });

    const token = createToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json(error);
  }
};
