// models/Rating.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface RatingAttributes {
  id: number;
  clothing_id: number;
  user_id: number;
  rate: number;
  created_at: Date;
}

interface RatingCreationAttributes
  extends Optional<RatingAttributes, "id" | "created_at"> {}

class Rating
  extends Model<RatingAttributes, RatingCreationAttributes>
  implements RatingAttributes
{
  public id!: number;
  public clothing_id!: number;
  public user_id!: number;
  public rate!: number;
  public created_at!: Date;
}

Rating.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    rate: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
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
    modelName: "Rating",
    tableName: "rating",
    timestamps: false,
    indexes: [
      {
        fields: ["clothing_id"],
      },
      {
        fields: ["user_id"],
      },
      {
        fields: ["clothing_id", "user_id"],
        unique: true,
      },
    ],
  }
);

export default Rating;
