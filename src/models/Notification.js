const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');

//        await user.destroy();
const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false // ID user for the recipient of the notification
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
        // type: 'enum',
        // values: ['info', 'warning', 'error'] // Example types
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'notifications'
});

// Associations
// Assuming you have a User model defined in User.js
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Notification;
