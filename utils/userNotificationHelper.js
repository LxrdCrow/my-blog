const UserNotification = require('../models/UserNotification');

/**
 * @param {String} userId
 * @param {String} notificationId
 */
const markAsRead = async (userId, notificationId) => {
    await UserNotification.findOneAndUpdate(
        { user: userId, notification: notificationId },
        { read: true }
    );
};

/**
 * @param {String} userId
 */
const markAllAsRead = async (userId) => {
    await UserNotification.updateMany(
        { user: userId, read: false },
        { read: true }
    );
};

/**
 * @param {String} userId
 * @returns {Promise<Array<UserNotification>>}
 */
const getUnreadNotifications = async (userId) => {
    return await UserNotification.find({ user: userId, read: false }).populate('notification');
};

/**
 * @param {String} userId
 * @param {String} notificationId
 */
const deleteNotificationForUser = async (userId, notificationId) => {
    await UserNotification.findOneAndDelete({
        user: userId,
        notification: notificationId
    });
};

module.exports = {
    markAsRead,
    markAllAsRead,
    getUnreadNotifications,
    deleteNotificationForUser
};
