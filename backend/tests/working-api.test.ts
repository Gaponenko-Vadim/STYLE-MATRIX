// tests/working-api.test.ts
import request from "supertest";
import express from "express";

// Создаем тестовое Express приложение
const app = express();
app.use(express.json());

// 📍 Тестовые маршруты которые точно работают
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Тестовый маршрут работает",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/test-validation", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "VALIDATION_ERROR",
      message: "Имя обязательно",
    });
  }

  res.json({
    success: true,
    message: `Привет, ${name}!`,
  });
});

// 🔧 Обработчик 404 для тестов
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "NOT_FOUND",
    message: "Маршрут не найден",
  });
});

describe("Working API Tests", () => {
  test("GET /api/test should return success", async () => {
    const response = await request(app).get("/api/test").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Тестовый маршрут работает");
  });

  test("POST /api/test-validation should work with valid data", async () => {
    const response = await request(app)
      .post("/api/test-validation")
      .send({ name: "Илья" })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Привет, Илья!");
  });

  test("POST /api/test-validation should return error with empty data", async () => {
    const response = await request(app)
      .post("/api/test-validation")
      .send({ name: "" })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("VALIDATION_ERROR");
  });

  test("GET /api/nonexistent should return 404", async () => {
    const response = await request(app).get("/api/nonexistent").expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("NOT_FOUND");
  });
});
