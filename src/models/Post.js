const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Importing models
const User = require("./User");
const Comment = require("./Comment");
const Like = require("./Like");
const Category = require("./Category");
const Tag = require("./Tag");
const PostTag = require("./PostTag");
const Share = require("./Share");
const Bookmark = require("./Bookmark");

const Post = sequelize.define(
    "Post",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        category_id: { type: DataTypes.INTEGER, allowNull: true },
        views: { type: DataTypes.INTEGER, defaultValue: 0 },
        published_at: { type: DataTypes.DATE, allowNull: true },
        status: { 
            type: DataTypes.ENUM("draft", "published", "archived"), 
            defaultValue: "draft" 
        },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
        timestamps: false, 
        tableName: "posts"
    }
);

// ** Relationships **

Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE" });

Post.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Post, { foreignKey: "category_id", onDelete: "SET NULL" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

Post.hasMany(Like, { foreignKey: "post_id", onDelete: "CASCADE" });
Like.belongsTo(Post, { foreignKey: "post_id" });

Post.hasMany(Share, { foreignKey: "post_id", onDelete: "CASCADE" });
Share.belongsTo(Post, { foreignKey: "post_id" });

Post.hasMany(Bookmark, { foreignKey: "post_id", onDelete: "CASCADE" });
Bookmark.belongsTo(Post, { foreignKey: "post_id" });

Post.belongsToMany(Tag, { through: PostTag, foreignKey: "post_id" });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: "tag_id" });


// ** METHOD HELPER **
Post.prototype.incrementViews = async function () {
    this.views += 1;
    await this.save();
};

Post.prototype.publish = async function () {
    this.status = "published";
    this.published_at = new Date();
    await this.save();
};

Post.prototype.archive = async function () {
    this.status = "archived";
    await this.save();
};

module.exports = Post;
