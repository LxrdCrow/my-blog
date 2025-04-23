const Session = require('../models/Session');

/**
 * Create a new session for a user
 * @param {String} userId
 * @param {String} userAgent
 * @returns {Promise<Session>}
 */
const createSession = async (userId, userAgent) => {
    return await Session.create({
        user: userId,
        userAgent
    });
};

/**
 * @param {String} userId
 */
const invalidateAllSessions = async (userId) => {
    await Session.deleteMany({ user: userId });
};

/**
 * @param {String} sessionId
 */
const invalidateSessionById = async (sessionId) => {
    await Session.findByIdAndDelete(sessionId);
};

/**
 * @param {String} userId
 * @returns {Promise<Array<Session>>}
 */
const getUserSessions = async (userId) => {
    return await Session.find({ user: userId });
};

/**
 * @param {String} sessionId
 * @returns {Promise<Boolean>}
 */
const isSessionValid = async (sessionId) => {
    const session = await Session.findById(sessionId);
    return !!session;
};

module.exports = {
    createSession,
    invalidateAllSessions,
    invalidateSessionById,
    getUserSessions,
    isSessionValid
};
