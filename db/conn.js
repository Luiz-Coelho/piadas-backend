const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;

const url = `mongodb+srv://${dbUser}:${dbPassword}${dbUrl}`;

async function main() {
  try {
    await mongoose.connect(url);
    console.log("Conectado ao banco de dados!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
