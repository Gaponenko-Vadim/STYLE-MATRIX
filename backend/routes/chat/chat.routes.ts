// routes/chat/chat.routes.ts
import { Router } from "express";
import {
  sendMessage,
  getConversation,
  getUserChats,
  shareTryOn,
} from "../../controllers/chatController";

const router = Router();

// 💬 Управление сообщениями
router.post("/message", sendMessage);
router.get("/conversation/:user1Id/:user2Id", getConversation);
router.get("/:userId/chats", getUserChats);

// 🎯 Шеринг примерок
router.post("/share-tryon", shareTryOn);

export default router;
