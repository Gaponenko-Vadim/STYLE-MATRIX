// tests/real-health.test.ts
import request from "supertest";
import express from "express";
import apiRoutes from "../routes";

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

describe("Real Health Check Test", () => {
  test("GET /api/health should return 200", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body.status).toBe("OK");
    expect(response.body.message).toBe("Илья ,я это сделал");
  });
});
