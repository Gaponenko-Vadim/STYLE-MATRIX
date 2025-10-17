// controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError, InternalServerError } from "../errors";

/**
 * 📧 Регистрация через email - ЗАГЛУШКА
 */
export const registerWithEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    // Простая валидация
    if (!email || !password || !name) {
      throw new ValidationError("Email, пароль и имя обязательны");
    }

    // Заглушка - всегда успешная регистрация
    res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      data: {
        user: {
          id: 1,
          email,
          name,
          role: "user",
        },
        token: "jwt_token_placeholder",
      },
    });
  }
);

/**
 * 📧 Логин через email - ЗАГЛУШКА
 */
export const loginWithEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email и пароль обязательны");
    }

    // Заглушка - всегда успешный логин
    res.status(200).json({
      success: true,
      message: "Успешный вход в систему",
      data: {
        user: {
          id: 1,
          email,
          name: "Тестовый Пользователь",
          role: "user",
        },
        token: "jwt_token_placeholder",
      },
    });
  }
);

/**
 * 🔐 Регистрация/логин через VK - ЗАГЛУШКА
 */
export const authWithVK = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.body;

    if (!access_token) {
      throw new ValidationError("Access token обязателен");
    }

    // Заглушка OAuth
    res.status(200).json({
      success: true,
      message: "VK OAuth - TODO: implement",
      data: {
        user: {
          id: 1,
          email: "vk_user@example.com",
          name: "VK User",
          role: "user",
        },
        token: "jwt_token_placeholder",
        provider: "vk",
      },
    });
  }
);

/**
 * 🔐 Регистрация/логин через Google - ЗАГЛУШКА
 */
export const authWithGoogle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id_token } = req.body;

    if (!id_token) {
      throw new ValidationError("ID token обязателен");
    }

    // Заглушка OAuth
    res.status(200).json({
      success: true,
      message: "Google OAuth - TODO: implement",
      data: {
        user: {
          id: 1,
          email: "google_user@example.com",
          name: "Google User",
          role: "user",
        },
        token: "jwt_token_placeholder",
        provider: "google",
      },
    });
  }
);

/**
 * 🔐 Регистрация/логин через Mail.ru - ЗАГЛУШКА
 */
export const authWithMail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.body;

    if (!access_token) {
      throw new ValidationError("Access token обязателен");
    }

    // Заглушка OAuth
    res.status(200).json({
      success: true,
      message: "Mail.ru OAuth - TODO: implement",
      data: {
        user: {
          id: 1,
          email: "mail_user@example.com",
          name: "Mail User",
          role: "user",
        },
        token: "jwt_token_placeholder",
        provider: "mail",
      },
    });
  }
);

/**
 * 📱 Отправка кода верификации для телефона - ЗАГЛУШКА
 */
export const sendVerificationCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;

    if (!phone) {
      throw new ValidationError("Номер телефона обязателен");
    }

    // Заглушка SMS
    res.status(200).json({
      success: true,
      message: "Код верификации отправлен",
      data: {
        code: process.env.NODE_ENV === "development" ? "123456" : undefined,
      },
    });
  }
);

/**
 * 📱 Регистрация/логин через телефон - ЗАГЛУШКА
 */
export const authWithPhone = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone, code } = req.body;

    if (!phone || !code) {
      throw new ValidationError("Номер телефона и код обязательны");
    }

    // Заглушка телефона
    res.status(200).json({
      success: true,
      message: "Успешная авторизация по телефону",
      data: {
        user: {
          id: 1,
          phone,
          name: "Phone User",
          role: "user",
        },
        token: "jwt_token_placeholder",
        provider: "phone",
      },
    });
  }
);

/**
 * 🚪 Выход из системы - ЗАГЛУШКА
 */
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "Успешный выход из системы",
    });
  }
);

/**
 * 🔄 Обновление токена - ЗАГЛУШКА
 */
export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw new ValidationError("Refresh token обязателен");
    }

    // Заглушка refresh token
    res.status(200).json({
      success: true,
      message: "Токен успешно обновлен",
      data: {
        token: "new_jwt_token_placeholder",
        refresh_token: "new_refresh_token_placeholder",
      },
    });
  }
);
