import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import User from "./models/User";
import { setupAssociations } from "./models/associations";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

sequelize.sync({ force: false }).then(() => console.log("DB synced"));
setupAssociations();
console.log("Database associations setup complete");

// Простые роуты без валидации
app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
