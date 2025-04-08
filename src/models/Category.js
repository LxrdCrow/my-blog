const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import model Post for relationship
const Post = require("./Post");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false,
        tableName: "categories"
    }
);

// ** Relationships **
Category.hasMany(Post, {
    foreignKey: "category_id",
    onDelete: "SET NULL"
});
Post.belongsTo(Category, {
    foreignKey: "category_id"
});

// Method to generate slug before creating a category
Category.beforeCreate(async (category) => {
    category.slug = category.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
});

module.exports = Category;
