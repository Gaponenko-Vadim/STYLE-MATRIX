// models/Clothing.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ClothingAttributes {
  id: number;
  user_id: number;
  type_id: number;
  brand_id: number;
  photo_2d_url?: string | null;
  material: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

interface ClothingCreationAttributes
  extends Optional<
    ClothingAttributes,
    "id" | "photo_2d_url" | "created_at" | "updated_at" | "deleted_at"
  > {}

class Clothing
  extends Model<ClothingAttributes, ClothingCreationAttributes>
  implements ClothingAttributes
{
  public id!: number;
  public user_id!: number;
  public type_id!: number;
  public brand_id!: number;
  public photo_2d_url!: string | null;
  public material!: string;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
}

Clothing.init(
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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo_2d_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "visible",
      validate: {
        isIn: [["visible", "hidden"]],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Clothing",
    tableName: "clothing",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["type_id"],
      },
      {
        fields: ["brand_id"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);

export default Clothing;
