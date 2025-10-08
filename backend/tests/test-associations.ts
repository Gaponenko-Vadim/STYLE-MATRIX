// tests/test-associations.ts
import sequelize from "../config/db";
import { setupAssociations } from "../models/associations";

// Исправленные импорты
import "../models/User";
import "../models/Avatar";
import "../models/Clothing";
import "../models/Clothing_Sizes"; // ← исправлено
import "../models/Clothing_3D_Models"; // ← исправлено
import "../models/UserWardrobe";
import "../models/Rating";
import "../models/Chat";
import "../models/Avatar_Outfits"; // ← исправлено
import "../models/AvatarTryOn";
import "../models/Type";
import "../models/Brand";

async function testAssociations() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    setupAssociations();
    console.log("✅ Associations setup complete");

    // Проверяем какие модели зарегистрированы
    console.log("\n📊 All registered models:");
    const modelNames = Object.keys(sequelize.models);
    console.log(modelNames.map((name) => `✅ ${name}`).join("\n"));

    // Проверяем связи для каждой зарегистрированной модели
    for (const modelName of modelNames) {
      const model = (sequelize as any).models[modelName];
      if (model && model.associations) {
        console.log(`\n🔗 ${modelName} associations:`);
        const associations = Object.keys(model.associations).map((key) => ({
          association: key,
          type: model.associations[key].associationType,
          target: model.associations[key].target.name,
        }));
        console.log(associations);
      }
    }

    console.log("\n🎉 Все связи настроены корректно!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await sequelize.close();
  }
}

testAssociations();
