const mongoose = require("mongoose");

const dbUri = process.env.DB_URI;

const uri = `${dbUri}`;

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Conectado ao banco de dados!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
