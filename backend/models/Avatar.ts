// models/Avatar.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface AvatarAttributes {
  id: number;
  user_id: number;
  face_data: object;
  body_type: object;
  photo_url: string;
  updated_at: Date;
  current_outfit_id?: number | null;
}

interface AvatarCreationAttributes
  extends Optional<
    AvatarAttributes,
    "id" | "updated_at" | "current_outfit_id"
  > {}

class Avatar
  extends Model<AvatarAttributes, AvatarCreationAttributes>
  implements AvatarAttributes
{
  public id!: number;
  public user_id!: number;
  public face_data!: object;
  public body_type!: object;
  public photo_url!: string;
  public updated_at!: Date;
  public current_outfit_id!: number | null;
}

Avatar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    face_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    body_type: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    current_outfit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "avatar_outfits",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Avatar",
    tableName: "avatars",
    timestamps: false,
    indexes: [
      {
        fields: ["user_id"],
        unique: true,
      },
    ],
  }
);

export default Avatar;
