const router = require("express").Router();

const profilePictureController = require("../controllers/profilePictureController");

router
  .route("/images/:filename")
  .get((req, res) => profilePictureController.getImage(req, res));

module.exports = router;
