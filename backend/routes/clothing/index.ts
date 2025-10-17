// routes/clothing/index.ts
import { Router } from "express";
import clothingRoutes from "./clothing.routes";

const router = Router();
router.use("/", clothingRoutes);
export default router;
