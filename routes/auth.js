const router = require("express").Router();

const upload = require("../config/multer");
const authController = require("../controllers/authController");

router
  .route("/register")
  .post(upload.single("profilePicture"), (req, res) =>
    authController.register(req, res)
  );

router.route("/login").post((req, res) => authController.login(req, res));

router.route("/logout").get((req, res) => authController.logout(req, res));

module.exports = router;
