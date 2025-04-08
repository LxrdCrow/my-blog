const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostTag = sequelize.define(
    "PostTag",
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: "post_tags"
    }
);

module.exports = PostTag;
