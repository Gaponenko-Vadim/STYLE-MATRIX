// tests/simple-api.test.ts
import request from "supertest";
import express from "express";

// Создаем простое приложение для тестов
const app = express();
app.use(express.json());

// Простой маршрут для тестирования
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Сервер работает",
    timestamp: new Date().toISOString(),
  });
});

// Простой маршрут для тестирования ошибок
app.post("/api/test-validation", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      error: "ValidationError",
      message: "Email обязателен",
    });
  }
  res.status(200).json({ success: true, email });
});

// Обработчик 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "NotFoundError",
    message: "Маршрут не найден",
  });
});

describe("Simple API Tests", () => {
  test("GET /api/health should work", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body.status).toBe("OK");
  });

  test("POST /api/test-validation should return error for empty email", async () => {
    const response = await request(app)
      .post("/api/test-validation")
      .send({ email: "" })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("ValidationError");
  });

  test("GET /api/nonexistent should return 404", async () => {
    const response = await request(app).get("/api/nonexistent").expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("NotFoundError");
  });
});
