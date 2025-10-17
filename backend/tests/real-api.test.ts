// tests/real-api.test.ts
import request from "supertest";
import express from "express";
import apiRoutes from "../routes";

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

describe("Real API Tests", () => {
  describe("Health Check", () => {
    test("GET /api/health should work", async () => {
      const response = await request(app).get("/api/health").expect(200);

      expect(response.body.status).toBe("OK");
    });
  });

  describe("Authentication", () => {
    test("POST /api/auth/register/email should create user", async () => {
      const userData = {
        email: "test@example.com",
        password: "123456",
        name: "Test User",
      };

      const response = await request(app)
        .post("/api/auth/register/email")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.name).toBe(userData.name);
    });

    test("POST /api/auth/register/email should validate empty email", async () => {
      const response = await request(app)
        .post("/api/auth/register/email")
        .send({ email: "", password: "123", name: "" })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe("Avatars", () => {
    test("POST /api/avatar should create avatar", async () => {
      const avatarData = {
        user_id: 1,
        face_data: { shape: "oval" },
        body_type: { height: 175 },
      };

      const response = await request(app)
        .post("/api/avatar")
        .send(avatarData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.avatar.user_id).toBe(1);
    });

    test("GET /api/avatar/:id should return avatar", async () => {
      const response = await request(app).get("/api/avatar/1").expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("Should return 404 for unknown routes", async () => {
      const response = await request(app).get("/api/unknown-route").expect(404);

      expect(response.body.error).toBeDefined();
    });
  });
});
