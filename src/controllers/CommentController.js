const { Comment, User, Post } = require('../models');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { post_id, content } = req.body;

        const comment = await Comment.create({
            user_id: req.user.id, // Assuming authentication middleware sets req.user
            post_id,
            content
        });

        return res.status(201).json(comment);
    } catch (err) {
        console.error("Create Comment Error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: { post_id: postId },
            include: [{ model: User, attributes: ['id', 'username'] }],
            order: [['created_at', 'ASC']]
        });

        return res.status(200).json(comments);
    } catch (err) {
        console.error("Get Comments Error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a comment (only by author)
exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await Comment.findByPk(commentId);

        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        if (comment.user_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

        comment.content = content;
        await comment.save();

        return res.status(200).json(comment);
    } catch (err) {
        console.error("Update Comment Error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a comment (only by author or admin)
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByPk(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });

        if (comment.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await comment.destroy();
        return res.status(204).send();
    } catch (err) {
        console.error("Delete Comment Error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
