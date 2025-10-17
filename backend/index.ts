import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import { setupAssociations } from "./models/associations";
import apiRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler"; // ✅ ДОБАВЬ ИМПОРТ
import User from "./models/User";
import Type from "./models/Type";
import Brand from "./models/Brand";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
sequelize
  .authenticate()
  .then(() => console.log("✅ База данных подключена"))
  .catch((err) => console.error("❌ Ошибка подключения к БД:", err));

sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Модели синхронизированы"))
  .then(async () => {
    // Создаем тестового пользователя если его нет
    const [user, userCreated] = await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Test User",
        email: "test@example.com",
        password_hash: "temp_hash_123",
        status: "active",
        role: "user",
      },
    });

    // ✅ СОЗДАЕМ ТИП ОДЕЖДЫ
    const [type, typeCreated] = await Type.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Футболка",
      },
    });

    // ✅ СОЗДАЕМ БРЕНД
    const [brand, brandCreated] = await Brand.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Nike",
      },
    });

    console.log("✅ Тестовые данные созданы:");
    console.log("   Пользователь:", user.id);
    console.log("   Тип одежды:", type.id, type.name);
    console.log("   Бренд:", brand.id, brand.name);
  })
  .catch((err) => console.error("❌ Ошибка синхронизации:", err));
// Подключаем роутеры
app.use("/api", apiRoutes);

// ✅ НА НАШИ MIDDLEWARE:
app.use(notFoundHandler); // 404 ошибки
app.use(errorHandler); // Все остальные ошибки

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(
    `📍 Регистрация: http://localhost:${PORT}/api/auth/register/email`
  );
  console.log(`📍 Логин: http://localhost:${PORT}/api/auth/login/email`);
});
