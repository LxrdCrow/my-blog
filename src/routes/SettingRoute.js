const express = require('express');
const router = express.Router();

const SettingController = require('../controllers/SettingController');

router.get('/:userId', SettingController.getSettings);

router.put('/:userId', SettingController.updateSettings);

module.exports = router;