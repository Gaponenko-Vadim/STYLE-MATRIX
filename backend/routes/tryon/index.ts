// routes/tryon/index.ts
import { Router } from "express";
import tryonRoutes from "./tryon.routes";

const router = Router();
router.use("/", tryonRoutes);
export default router;
