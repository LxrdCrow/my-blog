const { Post, Tag, PostTag } = require('../models');
const { logAction } = require('./AuditLogController');

const PostTagController = {
    async addTagsToPost(req, res) {
        const { postId, tagIds } = req.body;

        try {
            const post = await Post.findByPk(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            if (post.userId !== req.user.id) {
                return res.status(403).json({ message: 'You are not allowed to modify this post.' });
            }

            await PostTag.destroy({ where: { postId } });

            // Add new tags
            const associations = tagIds.map(tagId => ({ postId, tagId }));
            await PostTag.bulkCreate(associations);

            await logAction(req.user.id, 'ADD_TAGS_TO_POST', `Tags ${tagIds.join(',')} added to post ${postId}`);

            res.status(200).json({ message: 'Tags associated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error associating tags', error: error.message });
        }
    },

    // Get tags of a post
    async getTagsOfPost(req, res) {
        const { postId } = req.params;

        try {
            const post = await Post.findByPk(postId, {
                include: {
                    model: Tag,
                    through: { attributes: [] }, // no PostTag data
                    attributes: ['id', 'name', 'slug'],
                }
            });

            if (!post) return res.status(404).json({ message: 'Post not found' });

            res.json({ tags: post.Tags });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tags', error: error.message });
        }
    },

    async removeTagFromPost(req, res) {
        const { postId, tagId } = req.body;

        try {
            const deleted = await PostTag.destroy({ where: { postId, tagId } });

            if (deleted === 0) {
                return res.status(404).json({ message: 'Tag or Post not found, or association does not exist' });
            }

            await logAction(req.user.id, 'REMOVE_TAG_FROM_POST', `Tag ${tagId} removed from post ${postId}`);

            res.json({ message: 'Tag removed from post successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing tag from post', error: error.message });
        }
    }
};

module.exports = PostTagController;
