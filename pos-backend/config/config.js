require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 5100,
  databaseURI:
  process.env.DATABASE_URI || "mongodb://localhost:27017/myapp",
  nodeEnv: process.env.NODE_ENV || "development",
});

module.exports = config;