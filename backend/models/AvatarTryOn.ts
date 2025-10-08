// models/AvatarTryOn.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface AvatarTryOnAttributes {
  id: number;
  avatar_id: number;
  outfit_id: number;
  screenshot_url: string;
  clothing_items: object;
  try_on_date: Date;
  fit_rating?: number | null;
  chat_id?: number | null;
}

interface AvatarTryOnCreationAttributes
  extends Optional<
    AvatarTryOnAttributes,
    "id" | "try_on_date" | "fit_rating" | "chat_id"
  > {}

class AvatarTryOn
  extends Model<AvatarTryOnAttributes, AvatarTryOnCreationAttributes>
  implements AvatarTryOnAttributes
{
  public id!: number;
  public avatar_id!: number;
  public outfit_id!: number;
  public screenshot_url!: string;
  public clothing_items!: object;
  public try_on_date!: Date;
  public fit_rating!: number | null;
  public chat_id!: number | null;
}

AvatarTryOn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "avatars",
        key: "id",
      },
    },
    outfit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "avatar_outfits",
        key: "id",
      },
    },
    screenshot_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    clothing_items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    try_on_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fit_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "chat",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "AvatarTryOn",
    tableName: "avatar_tryons",
    timestamps: false,
    indexes: [
      {
        fields: ["avatar_id"],
      },
      {
        fields: ["outfit_id"],
      },
      {
        fields: ["chat_id"],
      },
      {
        fields: ["try_on_date"],
      },
    ],
  }
);

export default AvatarTryOn;
