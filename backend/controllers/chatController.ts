// controllers/chatController.ts
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware";
import { ValidationError } from "../errors";

/**
 * 💬 Отправить сообщение - ЗАГЛУШКА
 */
export const sendMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, recipient_id, message } = req.body;

    if (!user_id || !recipient_id || !message) {
      throw new ValidationError("user_id, recipient_id и message обязательны");
    }

    res.status(201).json({
      success: true,
      message: "Сообщение отправлено",
      data: {
        chatMessage: {
          id: 1,
          user_id,
          recipient_id,
          message,
          created_at: new Date().toISOString(),
        },
      },
    });
  }
);

/**
 * 💬 Получить переписку между пользователями - ЗАГЛУШКА
 */
export const getConversation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user1Id, user2Id } = req.params;

    if (!user1Id || !user2Id) {
      throw new ValidationError("user1Id и user2Id обязательны");
    }

    res.status(200).json({
      success: true,
      message: "Переписка получена",
      data: {
        user1Id: parseInt(user1Id),
        user2Id: parseInt(user2Id),
        messages: [
          {
            id: 1,
            user_id: parseInt(user1Id),
            recipient_id: parseInt(user2Id),
            message: "Привет! Как дела?",
            created_at: "2024-01-15T10:00:00.000Z",
          },
          {
            id: 2,
            user_id: parseInt(user2Id),
            recipient_id: parseInt(user1Id),
            message: "Привет! Все отлично, спасибо!",
            created_at: "2024-01-15T10:05:00.000Z",
          },
        ],
      },
    });
  }
);

/**
 * 📱 Получить чаты пользователя - ЗАГЛУШКА
 */
export const getUserChats = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
      throw new ValidationError("userId обязателен");
    }

    res.status(200).json({
      success: true,
      message: "Чаты пользователя получены",
      data: {
        userId: parseInt(userId),
        chats: [
          {
            id: 1,
            participant_id: 2,
            participant_name: "Анна",
            last_message: "Смотри какой наряд!",
            last_message_time: "2024-01-15T11:00:00.000Z",
            unread_count: 2,
          },
          {
            id: 2,
            participant_id: 3,
            participant_name: "Михаил",
            last_message: "Привет! Как примерка?",
            last_message_time: "2024-01-15T10:30:00.000Z",
            unread_count: 0,
          },
        ],
      },
    });
  }
);

/**
 * 🎯 Поделиться примеркой в чате - ЗАГЛУШКА
 */
export const shareTryOn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tryon_id, chat_id, message } = req.body;

    if (!tryon_id || !chat_id) {
      throw new ValidationError("tryon_id и chat_id обязательны");
    }

    res.status(201).json({
      success: true,
      message: "Примерка опубликована в чате",
      data: {
        share: {
          id: 1,
          tryon_id,
          chat_id,
          message: message || "Смотри как сидит!",
          screenshot_url: "https://example.com/screenshots/tryon_1.jpg",
          created_at: new Date().toISOString(),
        },
      },
    });
  }
);
