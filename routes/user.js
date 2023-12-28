const router = require("express").Router();

const userController = require("../controllers/userController");

const upload = require("../config/multer");

router.route("/user/:id").get((req, res) => userController.getUser(req, res));

router
  .route("/user/:id")
  .put(upload.single("profilePicture"), (req, res) =>
    userController.updateUser(req, res)
  );

module.exports = router;
