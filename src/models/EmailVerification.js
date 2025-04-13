const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");

// Model for EmailVerification table
// This model is used to manage email verification tokens for users
const EmailVerification = sequelize.define("EmailVerification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: "email_verifications"
});


EmailVerification.belongsTo(User, { foreignKey: "user_id" });

module.exports = EmailVerification;
