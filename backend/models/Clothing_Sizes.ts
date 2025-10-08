// models/ClothingSize.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ClothingSizeAttributes {
  id: number;
  clothing_id: number;
  size: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

interface ClothingSizeCreationAttributes
  extends Optional<
    ClothingSizeAttributes,
    "id" | "created_at" | "updated_at"
  > {}

class ClothingSize
  extends Model<ClothingSizeAttributes, ClothingSizeCreationAttributes>
  implements ClothingSizeAttributes
{
  public id!: number;
  public clothing_id!: number;
  public size!: string;
  public quantity!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

ClothingSize.init(
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
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
    modelName: "ClothingSize",
    tableName: "clothing_sizes",
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
        unique: true,
      },
    ],
  }
);

export default ClothingSize;
