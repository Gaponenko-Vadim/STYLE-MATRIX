// controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError, UnauthorizedError } from "../errors";
import User from "../models/User";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";

/**
 * 📧 Регистрация через email
 */
export const registerWithEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    // Валидация
    if (!email || !password || !name) {
      throw new ValidationError("Email, пароль и имя обязательны");
    }

    if (password.length < 6) {
      throw new ValidationError("Пароль должен быть не менее 6 символов");
    }

    // Проверяем, существует ли пользователь
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ValidationError("Пользователь с таким email уже существует");
    }

    // Создаем пользователя
    const user = await User.create({
      email,
      password_hash: password,
      name,
    });

    // Генерируем токены
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Сохраняем refresh token в базе
    await user.setRefreshToken(tokens.refreshToken);

    res.status(201).json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      data: {
        user: user.toSafeJSON(),
        token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
    });
  }
);

/**
 * 📧 Логин через email
 */
export const loginWithEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email и пароль обязательны");
    }

    // Находим пользователя
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError("Неверный email или пароль");
    }

    // Проверяем статус пользователя
    if (user.status !== "active") {
      throw new UnauthorizedError("Аккаунт неактивен");
    }

    // Проверяем пароль
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Неверный email или пароль");
    }

    // Генерируем токены
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Сохраняем refresh token в базе
    await user.setRefreshToken(tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: "Успешный вход в систему",
      data: {
        user: user.toSafeJSON(),
        token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
    });
  }
);

/**
 * 🔄 Обновление токена
 */
export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw new ValidationError("Refresh token обязателен");
    }

    try {
      // Проверяем refresh token
      const payload = verifyRefreshToken(refresh_token);

      // Находим пользователя
      const user = await User.findOne({
        where: {
          id: payload.userId,
          refresh_token: refresh_token,
        },
      });

      if (!user) {
        throw new UnauthorizedError("Недействительный refresh token");
      }

      // Генерируем новые токены
      const tokens = generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Обновляем refresh token в базе
      await user.setRefreshToken(tokens.refreshToken);

      res.status(200).json({
        success: true,
        message: "Токен успешно обновлен",
        data: {
          token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
        },
      });
    } catch (error) {
      throw new UnauthorizedError("Недействительный refresh token");
    }
  }
);

/**
 * 🚪 Выход из системы
 */
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.body;

    if (refresh_token) {
      // Находим пользователя по refresh token и очищаем его
      const user = await User.findOne({ where: { refresh_token } });
      if (user) {
        await user.setRefreshToken(null);
      }
    }

    res.status(200).json({
      success: true,
      message: "Успешный выход из системы",
    });
  }
);

/**
 * 👤 Получение профиля пользователя (защищенный маршрут)
 */
export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // req.user устанавливается в middleware authenticateToken
    if (!req.user) {
      throw new UnauthorizedError("Пользователь не найден");
    }

    const user = await User.findByPk(req.user.userId);

    if (!user) {
      throw new UnauthorizedError("Пользователь не найден");
    }

    res.status(200).json({
      success: true,
      data: {
        user: user.toSafeJSON(),
      },
    });
  }
);

/**
 * 🛡️ Защищенный тестовый маршрут
 */
export const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("Доступ запрещен");
    }

    res.status(200).json({
      success: true,
      message: "Это защищенный маршрут!",
      user: req.user,
    });
  }
);

// Остальные методы остаются заглушками
export const authWithVK = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.body;

    if (!access_token) {
      throw new ValidationError("Access token обязателен");
    }

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

export const authWithGoogle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id_token } = req.body;

    if (!id_token) {
      throw new ValidationError("ID token обязателен");
    }

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

export const authWithMail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.body;

    if (!access_token) {
      throw new ValidationError("Access token обязателен");
    }

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

export const sendVerificationCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;

    if (!phone) {
      throw new ValidationError("Номер телефона обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Код верификации отправлен",
      data: {
        code: process.env.NODE_ENV === "development" ? "123456" : undefined,
      },
    });
  }
);

export const authWithPhone = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phone, code } = req.body;

    if (!phone || !code) {
      throw new ValidationError("Номер телефона и код обязательны");
    }

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
