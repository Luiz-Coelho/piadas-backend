const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { favoriteSchema } = require("./Favorite");

const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please, enter your email."],
    unique: [true, "This emails is already registered in another account."],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: [6, "The password must have at least 6 characters."],
  },
  favorites: {
    type: [favoriteSchema],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
