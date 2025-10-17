// routes/avatar/avatar.routes.ts
import { Router } from "express";
import {
  createAvatar,
  getAvatar,
  updateAvatar,
  getAvatarOutfits,
  setCurrentOutfit,
} from "../../controllers/avatarController";

const router = Router();

// 🎭 Основные операции с аватаром
router.post("/", createAvatar);
router.get("/:id", getAvatar);
router.put("/:id", updateAvatar);

// 👗 Outfits аватара
router.get("/:id/outfits", getAvatarOutfits);
router.put("/:id/current-outfit", setCurrentOutfit);

export default router;
