// models/UserWardrobe.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserWardrobeAttributes {
  id: number;
  user_id: number;
  clothing_id: number;
  added_at: Date;
  fit_rating?: number | null;
}

interface UserWardrobeCreationAttributes
  extends Optional<UserWardrobeAttributes, "id" | "added_at" | "fit_rating"> {}

class UserWardrobe
  extends Model<UserWardrobeAttributes, UserWardrobeCreationAttributes>
  implements UserWardrobeAttributes
{
  public id!: number;
  public user_id!: number;
  public clothing_id!: number;
  public added_at!: Date;
  public fit_rating!: number | null;
}

UserWardrobe.init(
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
    clothing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clothing",
        key: "id",
      },
    },
    added_at: {
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
  },
  {
    sequelize,
    modelName: "UserWardrobe",
    tableName: "user_wardrobe",
    timestamps: false,
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["clothing_id"],
      },
      {
        fields: ["user_id", "clothing_id"],
        unique: true,
      },
    ],
  }
);

export default UserWardrobe;
