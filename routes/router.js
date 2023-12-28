const router = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const favoritesRouter = require("./favorites");
const profilePictureRouter = require("./profilePicture");

const { auth } = require("../middlewares/authMiddlewares");

router.use("/", authRouter);

router.use("/", auth, favoritesRouter);

router.use("/", auth, userRouter);

router.use("/", auth, profilePictureRouter);

module.exports = router;
