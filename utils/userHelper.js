const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Obtain user by ID
 * @param {number} userId 
 * @returns {Promise<User|null>}
 */
async function getUserById(userId) {
    return await User.findByPk(userId);
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User|null>}
 */
async function authenticateUser(username, password) {
    const user = await User.findOne({ where: { username } });
    
    if (user && await user.checkPassword(password)) {
        return user; // Authentication successful
    }
    return null; // Authentication failed
}

/**
 * Update user settings
 * @param {number} userId 
 * @param {Object} newSettings 
 * @returns {Promise<User>}
 */
async function updateUserSettings(userId, newSettings) {
    const user = await getUserById(userId);
    if (user) {
        Object.assign(user, newSettings);
        await user.save();
        return user;
    }
    throw new Error("User not found");
}

/**
 * Create a new user
 * @param {Object} userData 
 * @returns {Promise<User>}
 */
async function createUser(userData) {
    const newUser = await User.create(userData);
    return newUser;
}

/**
 * Delete a user by ID
 * @param {number} userId 
 * @returns {Promise<void>}
 */
async function deleteUser(userId) {
    const user = await getUserById(userId);
    if (user) {
        await user.destroy();
    } else {
        throw new Error("User not found");
    }
}

module.exports = {
    getUserById,
    authenticateUser,
    updateUserSettings,
    createUser,
    deleteUser
};
