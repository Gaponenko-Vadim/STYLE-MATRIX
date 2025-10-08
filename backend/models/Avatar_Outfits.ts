// models/AvatarOutfit.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface AvatarOutfitAttributes {
  id: number;
  avatar_id: number;
  clothing_id: number;
  size: string;
  layer_order: number;
  created_at: Date;
}

interface AvatarOutfitCreationAttributes
  extends Optional<AvatarOutfitAttributes, "id" | "created_at"> {}

class AvatarOutfit
  extends Model<AvatarOutfitAttributes, AvatarOutfitCreationAttributes>
  implements AvatarOutfitAttributes
{
  public id!: number;
  public avatar_id!: number;
  public clothing_id!: number;
  public size!: string;
  public layer_order!: number;
  public created_at!: Date;
}

AvatarOutfit.init(
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
    layer_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "AvatarOutfit",
    tableName: "avatar_outfits",
    timestamps: false,
    indexes: [
      {
        fields: ["avatar_id"],
      },
      {
        fields: ["clothing_id"],
      },
      {
        fields: ["avatar_id", "clothing_id"],
      },
      {
        fields: ["layer_order"],
      },
    ],
  }
);

export default AvatarOutfit;
