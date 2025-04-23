const Notification = require('../models/Notification');
const UserNotification = require('../models/UserNotification');

const createNotification = async (type, senderId, receiverId, targetId) => {
    try {
        const notification = await Notification.create({
            type,
            sender: senderId,
            target: targetId
        });

        await UserNotification.create({
            user: receiverId,
            notification: notification._id
        });

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

module.exports = {
    createNotification,
};
