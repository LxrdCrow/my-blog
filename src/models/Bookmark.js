const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importing models
const User = require("./user");
const Post = require("./Post");

const Bookmark = sequelize.define(
    "Bookmark",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false,
        tableName: "bookmarks"
    }
);


User.hasMany(Bookmark, { foreignKey: "user_id", onDelete: "CASCADE" });
Bookmark.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Bookmark, { foreignKey: "post_id", onDelete: "CASCADE" });
Bookmark.belongsTo(Post, { foreignKey: "post_id" });

module.exports = Bookmark;
