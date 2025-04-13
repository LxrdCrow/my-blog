const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Notification = require('./Notification');

// This model represents the relationship between users and notifications
// It allows to track which notifications have been sent to which users and whether they have been read or not
const UserNotification = sequelize.define('UserNotification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // If the notification has been read or not
    },
    read_at: {
        type: DataTypes.DATE,
        allowNull: true, // When the notification was read
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'user_notifications',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'notification_id'] // Unique index to prevent duplicate entries for the same user and notification
        }
    ]
});

// Define the associations between User, Notification and UserNotification models
User.belongsToMany(Notification, { through: UserNotification, foreignKey: 'user_id' });
Notification.belongsToMany(User, { through: UserNotification, foreignKey: 'notification_id' });

module.exports = UserNotification;
