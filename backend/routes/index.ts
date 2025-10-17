import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import clothingRoutes from "./clothing";
import avatarRoutes from "./avatar";
import wardrobeRoutes from "./wardrobe";
import tryonRoutes from "./tryon";
import chatRoutes from "./chat";
console.log("🎯 Avatar routes импортированы в главный router!"); // Добавьте эту строку

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Илья ,я это сделал",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clothing", clothingRoutes);
router.use("/avatars", avatarRoutes);
router.use("/wardrobe", wardrobeRoutes);
router.use("/tryon", tryonRoutes);
router.use("/chat", chatRoutes);

export default router;
