const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = require("./Post");
const PostTag = require("./PostTag");


const Tag = sequelize.define(
    "Tag",
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
        tableName: "tags"
    }
);


Tag.belongsToMany(Post, { through: PostTag, foreignKey: "tag_id" });
Post.belongsToMany(Tag, { through: PostTag, foreignKey: "post_id" });


Tag.beforeCreate((tag) => {
    tag.slug = tag.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
});

module.exports = Tag;
