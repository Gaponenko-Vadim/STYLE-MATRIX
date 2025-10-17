// routes/wardrobe/index.ts
import { Router } from "express";
import wardrobeRoutes from "./wardrobe.routes";

const router = Router();
router.use("/", wardrobeRoutes);
export default router;
