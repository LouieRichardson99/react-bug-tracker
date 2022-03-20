const Sequelize = require("sequelize");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const database = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

module.exports = database;
