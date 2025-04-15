const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

router.get('/:userId', NotificationController.getUserNotifications);

router.patch('/:notificationId/read', NotificationController.markAsRead);

router.delete('/:notificationId', NotificationController.deleteNotification);

module.exports = router;
