// routes/avatar/index.ts
import { Router } from "express";
import avatarRoutes from "./avatar.routes";

const router = Router();
router.use("/", avatarRoutes);
export default router;
