// routes/clothing/clothing.routes.ts
import { Router } from "express";
import {
  createClothing,
  getClothing,
  updateClothing,
  deleteClothing,
  getClothingRatings,
  getClothing3DModels,
} from "../../controllers/clothingController";

const router = Router();

// 👕 Основные операции с одеждой
router.post("/", (req, res, next) => {
  console.log("🎯 [ROUTE] POST /api/clothing вызван");
  console.log("🎯 [ROUTE] Headers:", req.headers);
  console.log("🎯 [ROUTE] Body:", req.body);
  createClothing(req, res, next);
});
router.get("/:id", getClothing);
router.put("/:id", updateClothing);
router.delete("/:id", deleteClothing);

// 📊 Дополнительная информация
router.get("/:id/ratings", getClothingRatings);
router.get("/:id/3d-models", getClothing3DModels);

export default router;
