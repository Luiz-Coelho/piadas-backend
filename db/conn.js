const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Conectado ao banco de dados!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
