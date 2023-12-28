const Favorite = require("../models/Favorite");

exports.create = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const userId = user._id;

    const existingFavorite = await Favorite.findOne({
      id: req.body.id,
      user: userId,
    });
    if (existingFavorite) {
      return res.status(400).json({ msg: "Favorite already exists" });
    }

    const favorite = {
      error: req.body.error,
      category: req.body.category,
      type: req.body.type,
      joke: req.body.joke,
      setup: req.body.setup,
      delivery: req.body.delivery,
      flags: req.body.flags,
      id: req.body.id,
      safe: req.body.safe,
      lang: req.body.lang,
      nickname: req.body.nickname,
      user: userId,
    };

    const response = await Favorite.create(favorite);

    return res
      .status(201)
      .json({ response, msg: "Joke added to your favorites." });
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};

exports.get = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const favorites = await Favorite.find({ user: user._id }).populate("user");

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};

exports.update = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const jokeId = req.params.id;

    const favorite = {
      error: req.body.error,
      category: req.body.category,
      type: req.body.type,
      joke: req.body.joke,
      setup: req.body.setup,
      delivery: req.body.delivery,
      flags: req.body.flags,
      id: req.body.id,
      safe: req.body.safe,
      lang: req.body.lang,
      nickname: req.body.nickname,
    };

    const updatedFavorite = await Favorite.findByIdAndUpdate(jokeId, favorite);

    if (!updatedFavorite) {
      return res.status(404).json({ msg: "Joke not found." });
    }

    return res
      .status(200)
      .json({ favorite, msg: "Joke added to your favorites." });
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const jokeId = req.params.id;

    const favorite = await Favorite.findById(jokeId);

    if (!favorite) {
      return res.status(404).json({ msg: "Joke not found." });
    }

    const deletedFavorite = await Favorite.findByIdAndDelete(jokeId);

    return res
      .status(200)
      .json({ deletedFavorite, msg: "Joke removed from your favorites." });
  } catch (error) {
    return res.status(500).json({ msg: "Server internal error" });
  }
};
