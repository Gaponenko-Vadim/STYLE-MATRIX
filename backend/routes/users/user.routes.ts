// routes/users/user.routes.ts
import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserClothes,
  getUserWardrobe,
  getUserRatings,
} from "../../controllers/usersController";

const router = Router();

// 👤 Профиль пользователя
router.get("/:id/profile", getUserProfile);
router.put("/:id/profile", updateUserProfile);

// 👕 Одежда и гардероб
router.get("/:id/clothes", getUserClothes);
router.get("/:id/wardrobe", getUserWardrobe);

// ⭐ Оценки
router.get("/:id/ratings", getUserRatings);

export default router;
