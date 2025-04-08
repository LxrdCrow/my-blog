const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const User = require("./user");
const Post = require("./Post");

const Comment = sequelize.define(
    "Comment",
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
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true // comments can be nested, so this can be null
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false,
        tableName: "comments"
    }
);

// ** Relationships **

User.hasMany(Comment, { foreignKey: "user_id", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

// Comments can be nested (self-referencing)
Comment.hasMany(Comment, {
    foreignKey: "parent_id",
    as: "replies",
    onDelete: "CASCADE"
});
Comment.belongsTo(Comment, {
    foreignKey: "parent_id",
    as: "parent"
});

module.exports = Comment;
