const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const User = require("./User");
const Post = require("./Post");

const Like = sequelize.define(
    "Like",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: "likes",
        indexes: [
            {
                unique: true,
                fields: ["user_id", "post_id"] // for unique constraint 
            }
        ]
    }
);

// RELAZIONI
Like.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Like.belongsTo(Post, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = Like;
