const { UserNotification, Notification } = require('../models');
const { Op } = require('sequelize');

const UserNotificationController = {
    // Get all notifications for the logged in user
    async getMyNotifications(req, res) {
        try {
            const notifications = await UserNotification.findAll({
                where: { userId: req.user.id },
                include: {
                    model: Notification,
                    attributes: ['id', 'title', 'message', 'type', 'createdAt']
                },
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching notifications', error: error.message });
        }
    },

    // Mark all notifications as read
    async markAllAsRead(req, res) {
        try {
            await UserNotification.update(
                { read: true },
                { where: { userId: req.user.id, read: false } }
            );

            res.status(200).json({ message: 'All notifications marked as read.' });
        } catch (error) {
            res.status(500).json({ message: 'Error marking notifications as read', error: error.message });
        }
    },

    // Mark single notification as read
    async markAsRead(req, res) {
        const { notificationId } = req.params;

        try {
            const updated = await UserNotification.update(
                { read: true },
                { where: { userId: req.user.id, notificationId } }
            );

            if (updated[0] === 0) {
                return res.status(404).json({ message: 'Notification not found or already read.' });
            }

            res.status(200).json({ message: 'Notification marked as read.' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating notification', error: error.message });
        }
    },

    async deleteNotification(req, res) {
        const { notificationId } = req.params;

        try {
            const deleted = await UserNotification.destroy({
                where: { userId: req.user.id, notificationId }
            });

            if (deleted === 0) {
                return res.status(404).json({ message: 'Notification not found' });
            }

            res.status(200).json({ message: 'Notification deleted.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting notification', error: error.message });
        }
    },

    // Count unread notifications
    async countUnread(req, res) {
        try {
            const count = await UserNotification.count({
                where: { userId: req.user.id, read: false }
            });

            res.status(200).json({ unreadCount: count });
        } catch (error) {
            res.status(500).json({ message: 'Error counting unread notifications', error: error.message });
        }
    }
};

module.exports = UserNotificationController;