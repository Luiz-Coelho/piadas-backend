const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../config/s3");

const maxAge = 7 * 24 * 60 * 60 * 1000;

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: maxAge });
};

const handleErrors = (error) => {
  console.log(error.message, error.code);

  let errors = {
    email: "",
    password: "",
  };

  if (error.message === "incorrect email") {
    errors.email = "This email is not registered";
  }

  if (error.message === "incorrect password") {
    errors.password = "The password is incorrect";
  }

  if (error.code === 11000) {
    errors.email = "This email is already registered in another account";
  }

  if (error._message === "User validation failed") {
    Object.entries(error.errors).forEach(([key, value]) => {
      if (errors.hasOwnProperty(key)) {
        errors[key] = value.properties.message;
      }
    });
  }

  return errors;
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let profilePicture;

    if (req.file) {
      profilePicture = await uploadFile(req.file);
    }

    const user = await User.create({
      profilePicture,
      name,
      email,
      password,
    });

    const token = createToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json(errors);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const token = createToken(user);

    return res.status(200).json({ token });
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json(errors);
  }
};
