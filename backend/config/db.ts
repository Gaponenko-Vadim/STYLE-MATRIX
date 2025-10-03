import { Sequelize } from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export default sequelize;
