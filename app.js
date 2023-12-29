const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config();

const conn = require("./db/conn");
conn();

app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Cookies recebidos:", req.cookies);
  next();
});

const corsOptions = {
  origin: "https://luiz-coelho.github.io",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());

const routes = require("./routes/router");

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor online na porta: ${process.env.PORT}`);
});
