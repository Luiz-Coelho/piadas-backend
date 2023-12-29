const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.user) {
      throw new Error("Token inválido");
    }

    const user = await User.findById(decodedToken.user._id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Requisição não autorizada" });
  }
};

module.exports = auth;
