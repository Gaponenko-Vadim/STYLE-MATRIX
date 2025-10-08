// models/Chat.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ChatAttributes {
  id: number;
  user_id: number;
  recipient_id: number;
  message: string;
  created_at: Date;
}

interface ChatCreationAttributes
  extends Optional<ChatAttributes, "id" | "created_at"> {}

class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  public id!: number;
  public user_id!: number;
  public recipient_id!: number;
  public message!: string;
  public created_at!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chat",
    timestamps: false,
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["recipient_id"],
      },
      {
        fields: ["created_at"],
      },
      {
        fields: ["user_id", "recipient_id"],
      },
    ],
  }
);

export default Chat;
