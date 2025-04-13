const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// with the audit log entry. This assumes you have a User model defined in the same directory.
// Adjust the import path as necessary based on your project structure.
const User = require('./User');

const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "The action performed (e.g., 'create', 'update', 'delete')"
    },
    target_model: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "The model to which the action refers (e.g., 'Post', 'Comment')"
    },
    target_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "The ID of the entity to which the action was applied (e.g., the post or comment ID)"
    },
    details: {
        type: DataTypes.JSONB,  // Additional details about the action, such as specific parameters
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'audit_logs'
});

// Relationship with the user who performed the action
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;

