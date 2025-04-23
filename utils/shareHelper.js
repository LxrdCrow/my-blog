const Share = require('../models/Share');

/**
 * @param {String} userId
 * @param {String} postId
 * @returns {Promise<Share>}
 */
const createShare = async (userId, postId) => {
    const existingShare = await Share.findOne({ user: userId, post: postId });
    if (existingShare) {
        throw new Error('You have already shared this post.');
    }

    return await Share.create({ user: userId, post: postId });
};

/**
 * @param {String} userId
 * @returns {Promise<Array<Share>>}
 */
const getSharesByUser = async (userId) => {
    return await Share.find({ user: userId }).populate('post');
};

/**
 * @param {String} postId
 * @returns {Promise<Array<Share>>}
 */
const getSharesByPost = async (postId) => {
    return await Share.find({ post: postId }).populate('user');
};

/**
 * @param {String} userId
 * @param {String} postId
 */
const deleteShare = async (userId, postId) => {
    await Share.findOneAndDelete({ user: userId, post: postId });
};

module.exports = {
    createShare,
    getSharesByUser,
    getSharesByPost,
    deleteShare
};
