// controllers/wardrobeController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";

/**
 * 👔 Добавить одежду в гардероб - ЗАГЛУШКА
 */
export const addToWardrobe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { clothing_id } = req.body;

    if (!userId) {
      throw new ValidationError("ID пользователя обязателен");
    }

    if (!clothing_id) {
      throw new ValidationError("clothing_id обязателен");
    }

    res.status(201).json({
      success: true,
      message: "Одежда добавлена в гардероб",
      data: {
        wardrobeItem: {
          id: 1,
          user_id: parseInt(userId),
          clothing_id,
          added_at: new Date().toISOString(),
          fit_rating: null,
        },
      },
    });
  }
);

/**
 * 🗑️ Удалить одежду из гардероба - ЗАГЛУШКА
 */
export const removeFromWardrobe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, clothingId } = req.params;

    if (!userId || !clothingId) {
      throw new ValidationError("ID пользователя и clothingId обязательны");
    }

    res.status(200).json({
      success: true,
      message: "Одежда удалена из гардероба",
      data: {
        userId: parseInt(userId),
        clothingId: parseInt(clothingId),
        removed_at: new Date().toISOString(),
      },
    });
  }
);

/**
 * 📂 Получить гардероб пользователя - ЗАГЛУШКА
 */
export const getUserWardrobe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
      throw new ValidationError("ID пользователя обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Гардероб пользователя получен",
      data: {
        userId: parseInt(userId),
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
              brand: "Nike",
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
              brand: "Levi's",
              photo_2d_url: "https://example.com/jeans.jpg",
            },
          },
        ],
      },
    });
  }
);

/**
 * ⭐ Обновить оценку посадки - ЗАГЛУШКА
 */
export const updateFitRating = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, clothingId } = req.params;
    const { rating } = req.body;

    if (!userId || !clothingId) {
      throw new ValidationError("ID пользователя и clothingId обязательны");
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new ValidationError("Рейтинг должен быть от 1 до 5");
    }

    res.status(200).json({
      success: true,
      message: "Оценка посадки обновлена",
      data: {
        userId: parseInt(userId),
        clothingId: parseInt(clothingId),
        fit_rating: rating,
        updated_at: new Date().toISOString(),
      },
    });
  }
);
