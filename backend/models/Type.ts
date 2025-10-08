// models/Type.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface TypeAttributes {
  id: number;
  name: string;
}

interface TypeCreationAttributes extends Optional<TypeAttributes, "id"> {}

class Type
  extends Model<TypeAttributes, TypeCreationAttributes>
  implements TypeAttributes
{
  public id!: number;
  public name!: string;
}

Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Type",
    tableName: "types",
    timestamps: false,
  }
);

export default Type;
