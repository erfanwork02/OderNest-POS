const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      config.databaseURI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      `MongoDB Connection Error: ${error.message}`
    );

    process.exit(1);
  }
};

module.exports = connectDB;