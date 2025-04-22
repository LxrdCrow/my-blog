const { Share, Post, User } = require('../models');
const { logAction } = require('./AuditLogController');

const ShareController = {
    async sharePost(req, res) {
        const { postId, message } = req.body;

        try {
            const post = await Post.findByPk(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            const newShare = await Share.create({
                userId: req.user.id,
                postId,
                message: message || '',
            });

            await logAction(req.user.id, 'SHARE_POST', `Post ID ${postId} shared.`);

            res.status(201).json({ message: 'Post shared successfully', share: newShare });
        } catch (error) {
            res.status(500).json({ message: 'Error sharing post', error: error.message });
        }
    },

    // Get all shares made by the authenticated user
    async getMyShares(req, res) {
        try {
            const shares = await Share.findAll({
                where: { userId: req.user.id },
                include: [
                    { model: Post, attributes: ['id', 'title', 'slug'] }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.json(shares);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving shares', error: error.message });
        }
    },

    // Optional: delete a share
    async deleteShare(req, res) {
        const { id } = req.params;

        try {
            const share = await Share.findByPk(id);

            if (!share || share.userId !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized or share not found' });
            }

            await share.destroy();
            await logAction(req.user.id, 'DELETE_SHARE', `Deleted share ID ${id}`);

            res.json({ message: 'Share deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting share', error: error.message });
        }
    }
};

module.exports = ShareController;
