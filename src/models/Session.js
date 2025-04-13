const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// This model represents a session for a user in the application
// It includes fields for the session ID, user ID, token, IP address, user agent, expiration date, and creation date
const Session = sequelize.define('Session', {
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
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'sessions'
});

// Associations
// Assuming you have a User model defined in User.js
Session.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Session;
