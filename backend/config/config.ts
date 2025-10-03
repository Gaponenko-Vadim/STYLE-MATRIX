import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Определяем возможные значения окружения
type Env = "development" | "test" | "production";

// Определяем интерфейс для конфигурации
interface Config {
  development: {
    username?: string;
    password?: string;
    database: string;
    host?: string;
    port?: number;
    dialect: Dialect;
    storage?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
  };
  test: {
    username?: string;
    password?: string;
    database: string;
    host?: string;
    port?: number;
    dialect: Dialect;
    storage?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
  };
  production: {
    username?: string;
    password?: string;
    database: string;
    host?: string;
    port?: number;
    dialect: Dialect;
    storage?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
  };
}

const config: Config = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "420020",
    database: process.env.DB_NAME || "matrix",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: "postgres" as Dialect,
    logging: console.log,
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "420020",
    database: process.env.DB_NAME
      ? `${process.env.DB_NAME}_test`
      : "matrix_test",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: "postgres" as Dialect,
    logging: false,
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "420020",
    database: process.env.DB_NAME || "matrix",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: "postgres" as Dialect,
    logging: false,
  },
};

// ИСПРАВЛЕННАЯ СТРОКА - безопасное получение конфигурации
const env: Env = (process.env.NODE_ENV as Env) || "development";
export default config[env];
