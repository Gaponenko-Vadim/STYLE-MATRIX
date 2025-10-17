// controllers/tryonController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";

/**
 * 🎯 Создать сессию примерки - ЗАГЛУШКА
 */
export const createTryOn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar_id, outfit_id, clothing_items } = req.body;

    if (!avatar_id || !outfit_id) {
      throw new ValidationError("avatar_id и outfit_id обязательны");
    }

    res.status(201).json({
      success: true,
      message: "Сессия примерки создана",
      data: {
        tryOn: {
          id: 1,
          avatar_id,
          outfit_id,
          screenshot_url: "https://example.com/screenshots/tryon_1.jpg",
          clothing_items: clothing_items || [
            { clothing_id: 1, size: "M", layer_order: 1 },
            { clothing_id: 2, size: "L", layer_order: 2 },
          ],
          try_on_date: new Date().toISOString(),
          fit_rating: null,
          chat_id: null,
        },
      },
    });
  }
);

/**
 * 📜 Получить историю примерок аватара - ЗАГЛУШКА
 */
export const getTryOnHistory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatarId } = req.params;

    if (!avatarId) {
      throw new ValidationError("avatarId обязателен");
    }

    res.status(200).json({
      success: true,
      message: "История примерок получена",
      data: {
        avatarId: parseInt(avatarId),
        history: [
          {
            id: 1,
            outfit_id: 1,
            screenshot_url: "https://example.com/screenshots/tryon_1.jpg",
            try_on_date: "2024-01-15T10:00:00.000Z",
            fit_rating: 5,
            clothing_items: [
              { clothing_id: 1, name: "Футболка", size: "M" },
              { clothing_id: 2, name: "Джинсы", size: "L" },
            ],
          },
          {
            id: 2,
            outfit_id: 2,
            screenshot_url: "https://example.com/screenshots/tryon_2.jpg",
            try_on_date: "2024-01-15T11:00:00.000Z",
            fit_rating: 4,
            clothing_items: [{ clothing_id: 3, name: "Платье", size: "S" }],
          },
        ],
      },
    });
  }
);

/**
 * 🔍 Получить детали примерки - ЗАГЛУШКА
 */
export const getTryOnDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID примерки обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Детали примерки получены",
      data: {
        tryOn: {
          id: parseInt(id),
          avatar_id: 1,
          outfit_id: 1,
          screenshot_url: "https://example.com/screenshots/tryon_1.jpg",
          clothing_items: [
            {
              clothing_id: 1,
              name: "Футболка базовая",
              type: "t-shirt",
              size: "M",
              brand: "Nike",
              photo_2d_url: "https://example.com/tshirt.jpg",
            },
            {
              clothing_id: 2,
              name: "Джинсы скинни",
              type: "jeans",
              size: "L",
              brand: "Levi's",
              photo_2d_url: "https://example.com/jeans.jpg",
            },
          ],
          try_on_date: "2024-01-15T10:00:00.000Z",
          fit_rating: 5,
          chat_id: null,
        },
      },
    });
  }
);

/**
 * ⭐ Оценить примерку - ЗАГЛУШКА
 */
export const rateTryOn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { rating } = req.body;

    if (!id) {
      throw new ValidationError("ID примерки обязателен");
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new ValidationError("Рейтинг должен быть от 1 до 5");
    }

    res.status(200).json({
      success: true,
      message: "Примерка оценена",
      data: {
        tryOnId: parseInt(id),
        fit_rating: rating,
        rated_at: new Date().toISOString(),
      },
    });
  }
);
