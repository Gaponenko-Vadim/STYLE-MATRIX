// routes/tryon/tryon.routes.ts
import { Router } from "express";
import {
  createTryOn,
  getTryOnHistory,
  getTryOnDetails,
  rateTryOn,
} from "../../controllers/tryonController";

const router = Router();

// 🎯 Управление примерками
router.post("/", createTryOn);
router.get("/:avatarId/history", getTryOnHistory);
router.get("/:id", getTryOnDetails);
router.put("/:id/rating", rateTryOn);

export default router;
