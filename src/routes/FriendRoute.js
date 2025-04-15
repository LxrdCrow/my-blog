const express = require('express');
const router = express.Router();

const SettingController = require('../controllers/UserFriendController');

router.post('/send', UserFriendController.sendFriendRequest);

router.post('/accept', UserFriendController.acceptFriendRequest);

router.post('/reject', UserFriendController.rejectFriendRequest);

router.get('/:userId', UserFriendController.getFriends);

router.get('requests/pending/:userId', UserFriendController.getPendingRequests);


module.exports = router;    