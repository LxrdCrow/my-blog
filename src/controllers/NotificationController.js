const { Notification } = require('../models');

// Obtain all notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ notifications });
    } catch (err) {
        console.error('Error getUserNotifications:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({
            where: { id, userId: req.user.id }
        });

        if (!notification) {
            return res.status(404).json({ message: 'Norification not found' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error('Error markAsRead:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({
            where: { id, userId: req.user.id }
        });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.destroy();

        res.status(200).json({ message: 'Notification deleted' });
    } catch (err) {
        console.error('Error deleteNotification:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
