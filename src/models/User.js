const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

// Import models for relationships
const Post = require("./Post");
const Comment = require("./Comment");
const Like = require("./Like");
const Bookmark = require("./Bookmark");
const Share = require("./Share");
const Notification = require("./Notification");
const UserFriend = require("./UserFriend");
const UserRole = require("./UserRole");
const Session = require("./Session");
const PasswordReset = require("./PasswordReset");
const EmailVerification = require("./EmailVerification");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM("user","admin"), defaultValue: "user" },
        bio: { type: DataTypes.TEXT },
        profile_picture: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
        
    },

    {
        timestamps: false, 
        tableName: "users"
    }
    
);

// ** RELATIONSHIPS **

User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Comment, { foreignKey: "user_id", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Like, { foreignKey: "user_id", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Bookmark, { foreignKey: "user_id", onDelete: "CASCADE" });
Bookmark.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Share, { foreignKey: "user_id", onDelete: "CASCADE" });
Share.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Notification, { foreignKey: "user_id", onDelete: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "user_id" });


User.belongsToMany(User, { as: "Friends", through: UserFriend, foreignKey: "user_id", otherKey: "friend_id" });


User.hasMany(UserRole, { foreignKey: "user_id", onDelete: "CASCADE" });
UserRole.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(Session, { foreignKey: "user_id", onDelete: "CASCADE" });
Session.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(PasswordReset, { foreignKey: "user_id", onDelete: "CASCADE" });
PasswordReset.belongsTo(User, { foreignKey: "user_id" });


User.hasMany(EmailVerification, { foreignKey: "user_id", onDelete: "CASCADE" });
EmailVerification.belongsTo(User, { foreignKey: "user_id" });


// ** METHOD HELPER **

// Method for hashing the password before creating a new user
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Method for hashing the password before updating a user
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;

