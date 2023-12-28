const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    error: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["single", "twopart"],
      required: true,
    },
    joke: {
      type: String,
    },
    setup: {
      type: String,
    },
    delivery: {
      type: String,
    },
    flags: {
      type: {
        nsfw: { type: Boolean, required: true },
        religious: { type: Boolean, required: true },
        political: { type: Boolean, required: true },
        racist: { type: Boolean, required: true },
        sexist: { type: Boolean, required: true },
        explicit: { type: Boolean, required: true },
      },
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    safe: {
      type: Boolean,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

(module.exports = Favorite), favoriteSchema;
