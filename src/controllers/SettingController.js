const { Setting } = require('../models');

// Obtain user settings
exports.getSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        const settings = await Setting.findOne({ where: { userId } });

        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json({ settings });
    } catch (err) {
        console.error('Error getSettings:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user settings
exports.updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            theme,
            notifications,
            language,
            visibility,
            customSettings
        } = req.body;

        const settings = await Setting.findOne({ where: { userId } });

        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        settings.theme = theme ?? settings.theme;
        settings.notifications = notifications ?? settings.notifications;
        settings.language = language ?? settings.language;
        settings.visibility = visibility ?? settings.visibility;
        settings.customSettings = customSettings ?? settings.customSettings;

        await settings.save();

        res.status(200).json({ message: 'Settings updated', settings });
    } catch (err) {
        console.error('Error updateSettings:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
