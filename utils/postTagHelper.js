const PostTag = require('../models/PostTag');
const Tag = require('../models/Tag');

/**
 * @param {String} postId
 * @param {Array<String>} tagIds
 */
const attachTagsToPost = async (postId, tagIds) => {
    const operations = tagIds.map(tagId => ({
        post: postId,
        tag: tagId
    }));
    await PostTag.insertMany(operations);
};

/**
 * @param {String} postId
 * @param {Array<String>} newTagIds
 */
const updatePostTags = async (postId, newTagIds) => {
    await PostTag.deleteMany({ post: postId });
    await attachTagsToPost(postId, newTagIds);
};

/**
 * @param {String} postId
 */
const removeAllTagsFromPost = async (postId) => {
    await PostTag.deleteMany({ post: postId });
};

/**
 * @param {String} postId
 * @returns {Array<Tag>}
 */
const getTagsForPost = async (postId) => {
    const relations = await PostTag.find({ post: postId }).populate('tag');
    return relations.map(rel => rel.tag);
};

module.exports = {
    attachTagsToPost,
    updatePostTags,
    removeAllTagsFromPost,
    getTagsForPost
};
