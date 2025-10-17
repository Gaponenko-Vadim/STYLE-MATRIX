// controllers/clothingController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";
import Clothing from "../models/Clothing"; // Импортируем модель

/**
 * 👕 Создать одежду - ЗАГЛУШКА
 */
// controllers/clothingController.ts

/**
 * 👕 Создать одежду - ПРОСТАЯ РЕАЛИЗАЦИЯ С SEQUELIZE
 */
// controllers/clothingController.ts

/**
 * 👕 Создать одежду - ИСПОЛЬЗУЕМ SEQUELIZE MODEL
 */
export const createClothing = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("🟡 [1] Контроллер createClothing вызван");
      console.log("🟡 [2] Тело запроса:", JSON.stringify(req.body, null, 2));

      const { user_id, type_id, brand_id, material, photo_2d_url } = req.body;

      console.log("🟡 [3] Параметры для создания:", {
        user_id: user_id || 1,
        type_id: type_id || 1,
        brand_id: brand_id || 1,
        material: material || "хлопок",
        photo_2d_url:
          photo_2d_url || "https://example.com/placeholder-clothing.jpg",
      });

      console.log("🟡 [4] Пытаемся создать запись Clothing...");

      // Создаем одежду
      const newClothing = await Clothing.create({
        user_id: user_id || 1,
        type_id: type_id || 1,
        brand_id: brand_id || 1,
        material: material || "хлопок",
        photo_2d_url:
          photo_2d_url || "https://example.com/placeholder-clothing.jpg",
        status: "visible",
      });

      console.log("✅ [5] Одежда успешно создана, ID:", newClothing.id);
      console.log(
        "✅ [6] Полная запись:",
        JSON.stringify(newClothing.toJSON(), null, 2)
      );

      res.status(201).json({
        success: true,
        message: "Одежда успешно создана",
        data: {
          clothing: newClothing,
        },
      });

      console.log("✅ [7] Ответ отправлен клиенту");
    } catch (error: unknown) {
      console.error("🔴 [ERROR] Ошибка в createClothing:");

      // Проверяем тип ошибки
      if (error instanceof Error) {
        console.error("🔴 Тип ошибки:", error.name);
        console.error("🔴 Сообщение:", error.message);
        console.error("🔴 Stack trace:", error.stack);

        // Проверяем специфические ошибки Sequelize
        if ("errors" in error) {
          console.error("🔴 Детали валидации:", (error as any).errors);
        }
        if ("parent" in error) {
          console.error("🔴 SQL ошибка:", (error as any).parent?.message);
        }
      } else {
        console.error("🔴 Неизвестный тип ошибки:", error);
      }

      next(error);
    }
  }
);
/**
 * 👕 Получить всю одежду - для проверки
 */

/**
 * 👕 Получить информацию об одежде - ЗАГЛУШКА
 */
export const getClothing = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID одежды обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Информация об одежде получена",
      data: {
        clothing: {
          id: parseInt(id),
          type_id: 1,
          brand_id: 1,
          material: "хлопок",
          photo_2d_url: "https://example.com/photo.jpg",
          status: "visible",
          created_at: "2024-01-15T10:00:00.000Z",
        },
      },
    });
  }
);

/**
 * ✏️ Обновить одежду - ЗАГЛУШКА
 */
export const updateClothing = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      throw new ValidationError("ID одежды обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Одежда обновлена",
      data: {
        clothing: {
          id: parseInt(id),
          ...updates,
          updated_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * 🗑️ Удалить одежду (soft delete) - ЗАГЛУШКА
 */
export const deleteClothing = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID одежды обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Одежда удалена",
      data: {
        clothingId: parseInt(id),
        deleted_at: new Date().toISOString(),
      },
    });
  }
);

/**
 * ⭐ Получить рейтинги одежды - ЗАГЛУШКА
 */
export const getClothingRatings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID одежды обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Рейтинги одежды получены",
      data: {
        clothingId: parseInt(id),
        averageRating: 4.5,
        ratings: [
          {
            id: 1,
            user_id: 1,
            rate: 5,
            comment: "Отличное качество!",
            created_at: "2024-01-15T10:00:00.000Z",
          },
          {
            id: 2,
            user_id: 2,
            rate: 4,
            comment: "Хорошо, но маломерит",
            created_at: "2024-01-15T11:00:00.000Z",
          },
        ],
      },
    });
  }
);

/**
 * 🎮 Получить 3D модели одежды - ЗАГЛУШКА
 */
export const getClothing3DModels = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID одежды обязателен");
    }

    res.status(200).json({
      success: true,
      message: "3D модели одежды получены",
      data: {
        clothingId: parseInt(id),
        models: [
          {
            id: 1,
            size: "M",
            model_3d_url: "https://example.com/model_m.glb",
            preview_image_url: "https://example.com/preview_m.jpg",
            scale_factor: 1.0,
          },
          {
            id: 2,
            size: "L",
            model_3d_url: "https://example.com/model_l.glb",
            preview_image_url: "https://example.com/preview_l.jpg",
            scale_factor: 1.1,
          },
        ],
      },
    });
  }
);
