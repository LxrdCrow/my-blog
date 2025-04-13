const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// This model represents the relationship between users and their friends
// It includes the user_id, friend_id, and status of the friendship
const UserFriend = sequelize.define('UserFriend', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'declined', 'blocked'),
        allowNull: false,
        defaultValue: 'pending'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'user_friends',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'friend_id']
        }
    ]
});


User.belongsToMany(User, {
    as: 'Friends',
    through: UserFriend,
    foreignKey: 'user_id',
    otherKey: 'friend_id'
});

module.exports = UserFriend;
