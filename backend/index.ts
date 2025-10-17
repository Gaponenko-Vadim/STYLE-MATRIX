import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import { setupAssociations } from "./models/associations";
import apiRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
sequelize
  .authenticate()
  .then(() => console.log("✅ База данных подключена"))
  .catch((err) => console.error("❌ Ошибка подключения к БД:", err));

// Настройка ассоциаций
setupAssociations();

sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Модели синхронизированы"))
  .catch((err) => console.error("❌ Ошибка синхронизации:", err));

// Подключаем роутеры
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Сервер работает нормально",
    timestamp: new Date().toISOString(),
  });
});

// Обработчики ошибок
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(
    `📍 Регистрация: POST http://localhost:${PORT}/api/auth/register/email`
  );
  console.log(`📍 Логин: POST http://localhost:${PORT}/api/auth/login/email`);
  console.log(`📍 Профиль: GET http://localhost:${PORT}/api/auth/profile`);
});
