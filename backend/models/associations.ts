// models/associations.ts
import User from "./User";
import Avatar from "./Avatar";
import Clothing from "./Clothing";
import ClothingSize from "./Clothing_Sizes";
import Clothing3DModel from "./Clothing_3D_Models";
import UserWardrobe from "./UserWardrobe";
import Rating from "./Rating";
import Chat from "./Chat";
import AvatarOutfit from "./Avatar_Outfits";
import AvatarTryOn from "./AvatarTryOn";
import Type from "./Type";
import Brand from "./Brand";

export function setupAssociations() {
  // Users → Avatars (1:1)
  User.hasOne(Avatar, {
    foreignKey: "user_id",
    as: "avatar",
    onDelete: "CASCADE",
  });
  Avatar.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // Users → Clothing (1:M) - ОДНА ассоциация с оригинальным алиасом
  User.hasMany(Clothing, {
    foreignKey: "user_id",
    as: "clothes", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  Clothing.belongsTo(User, {
    foreignKey: "user_id",
    as: "user", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Users → User_Wardrobe (1:M)
  User.hasMany(UserWardrobe, {
    foreignKey: "user_id",
    as: "wardrobe",
    onDelete: "CASCADE",
  });
  UserWardrobe.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // Users → Rating (1:M)
  User.hasMany(Rating, {
    foreignKey: "user_id",
    as: "ratings", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  Rating.belongsTo(User, {
    foreignKey: "user_id",
    as: "user", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Users → Chat (1:M) - как отправитель
  User.hasMany(Chat, {
    foreignKey: "user_id",
    as: "sentMessages",
    onDelete: "CASCADE",
  });
  Chat.belongsTo(User, {
    foreignKey: "user_id",
    as: "sender",
  });

  // Users → Chat (1:M) - как получатель
  User.hasMany(Chat, {
    foreignKey: "recipient_id",
    as: "receivedMessages",
    onDelete: "CASCADE",
  });
  Chat.belongsTo(User, {
    foreignKey: "recipient_id",
    as: "recipient",
  });

  // Avatars → Avatar_Outfits (1:M)
  Avatar.hasMany(AvatarOutfit, {
    foreignKey: "avatar_id",
    as: "outfits",
    onDelete: "CASCADE",
  });
  AvatarOutfit.belongsTo(Avatar, {
    foreignKey: "avatar_id",
    as: "avatar",
  });

  // Avatars → Avatar_TryOns (1:M)
  Avatar.hasMany(AvatarTryOn, {
    foreignKey: "avatar_id",
    as: "tryOns",
    onDelete: "CASCADE",
  });
  AvatarTryOn.belongsTo(Avatar, {
    foreignKey: "avatar_id",
    as: "avatar",
  });

  // Clothing → Rating (1:M)
  Clothing.hasMany(Rating, {
    foreignKey: "clothing_id",
    as: "ratings",
    onDelete: "CASCADE",
  });
  Rating.belongsTo(Clothing, {
    foreignKey: "clothing_id",
    as: "clothing",
  });

  // Clothing → Clothing_Sizes (1:M)
  Clothing.hasMany(ClothingSize, {
    foreignKey: "clothing_id",
    as: "sizes", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  ClothingSize.belongsTo(Clothing, {
    foreignKey: "clothing_id",
    as: "clothing",
  });

  // Clothing → User_Wardrobe (1:M)
  Clothing.hasMany(UserWardrobe, {
    foreignKey: "clothing_id",
    as: "inWardrobes", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  UserWardrobe.belongsTo(Clothing, {
    foreignKey: "clothing_id",
    as: "clothing",
  });

  // Clothing → Clothing_3D_Models (1:M)
  Clothing.hasMany(Clothing3DModel, {
    foreignKey: "clothing_id",
    as: "models3d", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  Clothing3DModel.belongsTo(Clothing, {
    foreignKey: "clothing_id",
    as: "clothing",
  });

  // Clothing → Avatar_Outfits (1:M)
  Clothing.hasMany(AvatarOutfit, {
    foreignKey: "clothing_id",
    as: "avatarOutfits", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  AvatarOutfit.belongsTo(Clothing, {
    foreignKey: "clothing_id",
    as: "clothing", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Chat → Avatar_TryOns (1:M)
  Chat.hasMany(AvatarTryOn, {
    foreignKey: "chat_id",
    as: "tryOns", // ← ОРИГИНАЛЬНЫЙ алиас
    onDelete: "CASCADE",
  });
  AvatarTryOn.belongsTo(Chat, {
    foreignKey: "chat_id",
    as: "chat",
  });

  // Avatar_TryOns → Avatar_Outfits (1:1)
  AvatarTryOn.belongsTo(AvatarOutfit, {
    foreignKey: "outfit_id",
    as: "outfit", // ← ОРИГИНАЛЬНЫЙ алиас
  });
  AvatarOutfit.hasOne(AvatarTryOn, {
    foreignKey: "outfit_id",
    as: "tryOn", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Clothing → Type (M:1)
  Clothing.belongsTo(Type, {
    foreignKey: "type_id",
    as: "type", // ← ОРИГИНАЛЬНЫЙ алиас
  });
  Type.hasMany(Clothing, {
    foreignKey: "type_id",
    as: "clothes", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Clothing → Brand (M:1)
  Clothing.belongsTo(Brand, {
    foreignKey: "brand_id",
    as: "brand", // ← ОРИГИНАЛЬНЫЙ алиас
  });
  Brand.hasMany(Clothing, {
    foreignKey: "brand_id",
    as: "clothes", // ← ОРИГИНАЛЬНЫЙ алиас
  });

  // Avatar → Avatar_Outfits (через current_outfit_id)
  Avatar.belongsTo(AvatarOutfit, {
    foreignKey: "current_outfit_id",
    as: "currentOutfit",
  });
  AvatarOutfit.hasOne(Avatar, {
    foreignKey: "current_outfit_id",
    as: "avatarUsing", // ← ОРИГИНАЛЬНЫЙ алиас
  });
}
