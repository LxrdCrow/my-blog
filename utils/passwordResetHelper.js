const crypto = require('crypto');
const PasswordReset = require('../models/PasswordReset');
const User = require('../models/User');

/**
 * Generate a random token and its hashed version
 * @param {String} userId
 * @returns {Object} - { token, hashedToken, expires }
 */
const generateResetToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expires = Date.now() + 1000 * 60 * 60;
    return { token, hashedToken, expires };
};

/**
 * Create a password reset token for a user
 * @param {String} userId
 * @returns {String} 
 */
const createPasswordReset = async (userId) => {
    const { token, hashedToken, expires } = generateResetToken();

    await PasswordReset.deleteMany({ user: userId });

    await PasswordReset.create({
        user: userId,
        token: hashedToken,
        expiresAt: new Date(expires),
    });

    return token;
};

/**
 * Verified if the token is valid and not expired
 * @param {String} token
 * @returns {Object|null} 
 */
const verifyResetToken = async (token) => {
    const hashed = crypto.createHash('sha256').update(token).digest('hex');

    const record = await PasswordReset.findOne({
        token: hashed,
        expiresAt: { $gt: new Date() },
    });

    return record;
};

/**
 * Reset the user's password
 * @param {String} userId
 * @param {String} newPassword
 * @returns {Object} 
 */
const resetUserPassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.password = newPassword;
    await user.save();

    // Delete the password reset token after successful password reset
    await PasswordReset.deleteMany({ user: userId });

    return user;
};

module.exports = {
    generateResetToken,
    createPasswordReset,
    verifyResetToken,
    resetUserPassword,
};
