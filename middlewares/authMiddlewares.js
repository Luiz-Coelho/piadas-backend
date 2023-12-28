const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  const token = req.cookies.user;

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ msg: "Token inválido" });
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  } else {
    return res.status(401).json({ msg: "Token não fornecido" });
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.user;

  if (token) {
    jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        next();
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        } catch (error) {
          res.locals.user = null;
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  auth,
  checkUser,
};
