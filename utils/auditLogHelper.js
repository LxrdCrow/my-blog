const AuditLog = require('../models/AuditLog');

/**
 * Build an audit log entry for user actions.
 * @param {Object} options 
 * @param {String} options.userId 
 * @param {String} options.action 
 * @param {String} [options.details] 
 */
const createAuditLog = async ({ userId, action, details = '' }) => {
    try {
        await AuditLog.create({
            user: userId,
            action,
            details,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error creating audit log:', error);
    }
};

module.exports = {
    createAuditLog,
};
