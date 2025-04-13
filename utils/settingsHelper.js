const Setting = require("../models/Setting");

/**
 * @param {string} key - key for the setting to retrieve
 * @param {number|null} user_id - (optional) user ID for user-specific settings
 * @returns {Promise<string|null>} - the value of the setting or null if not found
 * @throws {Error} - if the setting is not found and user_id is provided
 */
async function getSetting(key, user_id = null) {
    const where = user_id ? { key, user_id } : { key };

    const setting = await Setting.findOne({ where });
    return setting ? setting.value : null;
}

module.exports = getSetting;
