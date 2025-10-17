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
} from "../../controllers/authController";

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

export default router;
