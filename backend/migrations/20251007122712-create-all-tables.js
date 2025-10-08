"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Создаем таблицы в правильном порядке

    // 1. Users
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "active",
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 2. Types
    await queryInterface.createTable("types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });

    // 3. Brands
    await queryInterface.createTable("brands", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });

    // 4. Clothing
    await queryInterface.createTable("clothing", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "types",
          key: "id",
        },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "brands",
          key: "id",
        },
      },
      photo_2d_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      material: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "visible",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // 5. Clothing_Sizes
    await queryInterface.createTable("clothing_sizes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clothing",
          key: "id",
        },
      },
      size: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 6. Clothing_3D_Models
    await queryInterface.createTable("clothing_3d_models", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clothing",
          key: "id",
        },
      },
      size: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      model_3d_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      preview_image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      scale_factor: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 1.0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 7. Avatars
    await queryInterface.createTable("avatars", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      face_data: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      body_type: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      photo_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      current_outfit_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 8. Avatar_Outfits
    await queryInterface.createTable("avatar_outfits", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "avatars",
          key: "id",
        },
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clothing",
          key: "id",
        },
      },
      size: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      layer_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 9. User_Wardrobe
    await queryInterface.createTable("user_wardrobe", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clothing",
          key: "id",
        },
      },
      added_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      fit_rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    // 10. Rating
    await queryInterface.createTable("rating", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clothing",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      rate: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 11. Chat
    await queryInterface.createTable("chat", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      message: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 12. Avatar_TryOns
    await queryInterface.createTable("avatar_tryons", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "avatars",
          key: "id",
        },
      },
      outfit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "avatar_outfits",
          key: "id",
        },
      },
      screenshot_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      clothing_items: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      try_on_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      fit_rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "chat",
          key: "id",
        },
      },
    });

    // Создаем индексы
  },

  async down(queryInterface, Sequelize) {
    // Удаляем в обратном порядке
    await queryInterface.dropTable("avatar_tryons");
    await queryInterface.dropTable("chat");
    await queryInterface.dropTable("rating");
    await queryInterface.dropTable("user_wardrobe");
    await queryInterface.dropTable("avatar_outfits");
    await queryInterface.dropTable("avatars");
    await queryInterface.dropTable("clothing_3d_models");
    await queryInterface.dropTable("clothing_sizes");
    await queryInterface.dropTable("clothing");
    await queryInterface.dropTable("brands");
    await queryInterface.dropTable("types");
    await queryInterface.dropTable("users");
  },
};
