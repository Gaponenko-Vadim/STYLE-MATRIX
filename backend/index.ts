import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import User from "./models/user";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

sequelize.sync({ force: false }).then(() => {
  console.log("DB synced");
});

app.post("/api/register", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.create({ username });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
);
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
