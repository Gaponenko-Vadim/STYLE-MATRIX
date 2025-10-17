// controllers/avatarController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";

/**
 * 🎭 Создать аватар - ЗАГЛУШКА
 */
export const createAvatar = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, face_data, body_type, photo_url } = req.body;

    if (!user_id) {
      throw new ValidationError("user_id обязателен");
    }

    res.status(201).json({
      success: true,
      message: "Аватар успешно создан",
      data: {
        avatar: {
          id: 1,
          user_id,
          face_data: face_data || { shape: "oval", skinTone: "light" },
          body_type: body_type || { height: 175, weight: 70 },
          photo_url: photo_url || "https://example.com/avatar.jpg",
          current_outfit_id: null,
          created_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * 🎭 Получить аватар - ЗАГЛУШКА
 */
export const getAvatar = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID аватара обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Аватар получен",
      data: {
        avatar: {
          id: parseInt(id),
          user_id: 1,
          face_data: { shape: "oval", skinTone: "light", features: {} },
          body_type: { height: 175, weight: 70, measurements: {} },
          photo_url: "https://example.com/avatar.jpg",
          current_outfit_id: 1,
          updated_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * ✏️ Обновить аватар - ЗАГЛУШКА
 */
export const updateAvatar = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      throw new ValidationError("ID аватара обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Аватар обновлен",
      data: {
        avatar: {
          id: parseInt(id),
          ...updates,
          updated_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * 👗 Получить outfits аватара - ЗАГЛУШКА
 */
export const getAvatarOutfits = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new ValidationError("ID аватара обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Outfits аватара получены",
      data: {
        avatarId: parseInt(id),
        outfits: [
          {
            id: 1,
            clothing_id: 1,
            size: "M",
            layer_order: 1,
            clothing_item: {
              id: 1,
              name: "Футболка",
              type: "t-shirt",
              photo_2d_url: "https://example.com/tshirt.jpg",
            },
          },
          {
            id: 2,
            clothing_id: 2,
            size: "L",
            layer_order: 2,
            clothing_item: {
              id: 2,
              name: "Джинсы",
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
 * 👑 Установить текущий outfit - ЗАГЛУШКА
 */
export const setCurrentOutfit = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { outfit_id } = req.body;

    if (!id || !outfit_id) {
      throw new ValidationError("ID аватара и outfit_id обязательны");
    }

    res.status(200).json({
      success: true,
      message: "Текущий outfit установлен",
      data: {
        avatarId: parseInt(id),
        currentOutfitId: outfit_id,
      },
    });
  }
);
