// controllers/usersController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";

/**
 * 👤 Получить профиль пользователя - ЗАГЛУШКА
 */
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID пользователя обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Профиль пользователя получен",
      data: {
        user: {
          id: parseInt(id),
          name: "Тестовый Пользователь",
          email: "test@example.com",
          role: "user",
          status: "active",
          created_at: "2024-01-15T10:00:00.000Z",
        },
      },
    });
  }
);

/**
 * ✏️ Обновить профиль пользователя - ЗАГЛУШКА
 */
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      throw new ValidationError("ID пользователя обязателен");
    }

    if (!name && !email) {
      throw new ValidationError(
        "Необходимо указать name или email для обновления"
      );
    }

    res.status(200).json({
      success: true,
      message: "Профиль пользователя обновлен",
      data: {
        user: {
          id: parseInt(id),
          name: name || "Тестовый Пользователь",
          email: email || "test@example.com",
          updated_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * 👕 Получить одежду пользователя - ЗАГЛУШКА
 */
export const getUserClothes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID пользователя обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Одежда пользователя получена",
      data: {
        userId: parseInt(id),
        clothes: [
          {
            id: 1,
            name: "Футболка",
            type: "t-shirt",
            status: "visible",
            created_at: "2024-01-15T10:00:00.000Z",
          },
          {
            id: 2,
            name: "Джинсы",
            type: "jeans",
            status: "visible",
            created_at: "2024-01-15T11:00:00.000Z",
          },
        ],
      },
    });
  }
);

/**
 * 🎪 Получить гардероб пользователя - ЗАГЛУШКА
 */
export const getUserWardrobe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID пользователя обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Гардероб пользователя получен",
      data: {
        userId: parseInt(id),
        wardrobe: [
          {
            id: 1,
            clothing_id: 1,
            added_at: "2024-01-15T10:00:00.000Z",
            fit_rating: 5,
            clothing_item: {
              id: 1,
              name: "Футболка базовая",
              type: "t-shirt",
              photo_2d_url: "https://example.com/tshirt.jpg",
            },
          },
          {
            id: 2,
            clothing_id: 2,
            added_at: "2024-01-15T11:00:00.000Z",
            fit_rating: 4,
            clothing_item: {
              id: 2,
              name: "Джинсы скинни",
              type: "jeans",
              photo_2d_url: "https://example.com/jeans.jpg",
            },
          },
        ],
      },
    });
  }
);

/**
 * ⭐ Получить оценки пользователя - ЗАГЛУШКА
 */
export const getUserRatings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID пользователя обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Оценки пользователя получены",
      data: {
        userId: parseInt(id),
        ratings: [
          {
            id: 1,
            clothing_id: 1,
            rate: 4.5,
            comment: "Отличное качество!",
            created_at: "2024-01-15T10:00:00.000Z",
            clothing_item: {
              id: 1,
              name: "Футболка базовая",
              type: "t-shirt",
            },
          },
        ],
      },
    });
  }
);
