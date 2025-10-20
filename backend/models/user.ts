// models/User.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { hashPassword } from "../utils/password";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  role: string;
  refresh_token?: string;
}

// Исправляем интерфейс создания
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "created_at" | "updated_at" | "refresh_token" | "status" | "role"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public status!: string;
  public role!: string;
  public refresh_token?: string;

  // Метод для проверки пароля
  public async checkPassword(password: string): Promise<boolean> {
    const { comparePassword } = await import("../utils/password");
    return await comparePassword(password, this.password_hash);
  }

  // Метод для обновления refresh token
  public async setRefreshToken(token: string | null): Promise<void> {
    this.refresh_token = token || undefined;
    await this.save();
  }

  // Метод для безопасного возврата пользователя (без пароля)
  public toSafeJSON(): any {
    const { id, password_hash, refresh_token, ...safeUser } = this.toJSON();
    // Переименовываем id в userId для согласованности с frontend
    return {
      userId: id,
      ...safeUser,
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
      validate: {
        isIn: [["active", "inactive", "banned"]],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "manager", "admin"]],
      },
    },
    refresh_token: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (user: User) => {
        user.password_hash = await hashPassword(user.password_hash);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password_hash")) {
          user.password_hash = await hashPassword(user.password_hash);
        }
      },
    },
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["refresh_token"],
      },
    ],
  }
);

export default User;
