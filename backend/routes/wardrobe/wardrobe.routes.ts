// routes/wardrobe/wardrobe.routes.ts
import { Router } from "express";
import {
  addToWardrobe,
  removeFromWardrobe,
  getUserWardrobe,
  updateFitRating,
} from "../../controllers/wardrobeController";

const router = Router();

// 👔 Управление гардеробом
router.post("/:userId/wardrobe", addToWardrobe);
router.delete("/:userId/wardrobe/:clothingId", removeFromWardrobe);
router.get("/:userId/wardrobe", getUserWardrobe);

// ⭐ Оценки посадки
router.put("/:userId/wardrobe/:clothingId/rating", updateFitRating);

export default router;
