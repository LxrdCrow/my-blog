const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Model import
const User = require("./User");
const Post = require("./Post");

const Share = sequelize.define(
    "Share",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true, // Allow null values
        },
        shared_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
        tableName: "shares",
    }
);


Share.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Share, { foreignKey: "user_id", onDelete: "CASCADE" });

Share.belongsTo(Post, { foreignKey: "post_id", onDelete: "CASCADE" });
Post.hasMany(Share, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = Share;
