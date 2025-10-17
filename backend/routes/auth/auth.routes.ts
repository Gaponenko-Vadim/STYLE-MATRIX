// routes/auth/auth.routes.ts
import { Router } from "express";
import {
  registerWithEmail,
  loginWithEmail,
  authWithVK,
  authWithGoogle,
  authWithMail,
  authWithPhone,
  sendVerificationCode,
  logout,
  refreshToken,
  getProfile,
  protectedRoute,
} from "../../controllers/authController";
import {
  authenticateToken,
  requireRole,
} from "../../middleware/authMiddleware";

const router = Router();

// 📧 Email аутентификация
router.post("/register/email", registerWithEmail);
router.post("/login/email", loginWithEmail);

// 🔐 OAuth аутентификация
router.post("/oauth/vk", authWithVK);
router.post("/oauth/google", authWithGoogle);
router.post("/oauth/mail", authWithMail);

// 📱 Телефонная аутентификация
router.post("/phone/send-code", sendVerificationCode);
router.post("/phone/verify", authWithPhone);

// 🔄 Управление сессией
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

// 👤 Защищенные маршруты
router.get("/profile", authenticateToken, getProfile);
router.get("/protected", authenticateToken, protectedRoute);
router.get("/admin", authenticateToken, requireRole(["admin"]), (req, res) => {
  res.json({
    success: true,
    message: "Добро пожаловать в админ-панель!",
    user: req.user,
  });
});

export default router;
