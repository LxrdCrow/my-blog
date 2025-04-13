const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Post = require('./Post');

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING, 
        allowNull: false
    },    
    value: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'settings',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'key'] // for unique constraint 
        }
    ]
});

Setting.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Setting;