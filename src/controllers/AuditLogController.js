const { AuditLog } = require("../models");
const { Op } = require("sequelize");

const AuditLogController = {
    // Utility to create a log entry (called from other controllers)
    async logAction(userId, action, details = "") {
        try {
            await AuditLog.create({
                userId: userId || null,
                action,
                details
            });
        } catch (error) {
            console.error("Error saving audit log:", error.message);
        }
    },

    // Fetch all logs for the authenticated user
    async getUserLogs(req, res) {
        try {
            const logs = await AuditLog.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
            res.json(logs);
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve logs", error: error.message });
        }
    },

    // Delete all logs of the authenticated user
    async deleteOwnLogs(req, res) {
        try {
            const deleted = await AuditLog.destroy({
                where: { userId: req.user.id }
            });
            res.json({ message: `${deleted} logs deleted.` });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete logs", error: error.message });
        }
    },

    // Delete logs older than X months for the current user
    async deleteOldLogsByUser(req, res) {
        const months = parseInt(req.query.months) || 6;
        const cutoffDate = new Date();
        cutoffDate.setMonth(cutoffDate.getMonth() - months);

        try {
            const deleted = await AuditLog.destroy({
                where: {
                    userId: req.user.id,
                    createdAt: { [Op.lt]: cutoffDate }
                }
            });
            res.json({ message: `Logs older than ${months} months deleted.` });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete old logs", error: error.message });
        }
    }
};

module.exports = AuditLogController;

