// models/Clothing3DModel.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface Clothing3DModelAttributes {
  id: number;
  clothing_id: number;
  size: string;
  model_3d_url: string;
  preview_image_url?: string | null;
  scale_factor: number;
  created_at: Date;
  updated_at: Date;
}

interface Clothing3DModelCreationAttributes
  extends Optional<
    Clothing3DModelAttributes,
    "id" | "preview_image_url" | "created_at" | "updated_at"
  > {}

class Clothing3DModel
  extends Model<Clothing3DModelAttributes, Clothing3DModelCreationAttributes>
  implements Clothing3DModelAttributes
{
  public id!: number;
  public clothing_id!: number;
  public size!: string;
  public model_3d_url!: string;
  public preview_image_url!: string | null;
  public scale_factor!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Clothing3DModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clothing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clothing",
        key: "id",
      },
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    model_3d_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    preview_image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    scale_factor: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 1.0,
      validate: {
        min: 0.01,
        max: 10.0,
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
  },
  {
    sequelize,
    modelName: "Clothing3DModel",
    tableName: "clothing_3d_models",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["clothing_id"],
      },
      {
        fields: ["size"],
      },
      {
        fields: ["clothing_id", "size"],
      },
    ],
  }
);

export default Clothing3DModel;
