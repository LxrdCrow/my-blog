const { Like, Post, User } = require('../models');

// Toggle like on a post
exports.toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the user exists
        const existingLike = await Like.findOne({ where: { postId, userId } });

        if (existingLike) {
            // If exists → remove it
            await existingLike.destroy();
            return res.status(200).json({ message: 'Like removed' });
        } else {
            // If not exists → add it
            await Like.create({ postId, userId });
            return res.status(201).json({ message: 'Like added' });
        }
    } catch (err) {
        console.error('Error toggleLike:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Check if user liked a post
exports.countLikes = async (req, res) => {
    try {
        const { postId } = req.params;

        const count = await Like.count({ where: { postId } });
        res.status(200).json({ postId, likes: count });
    } catch (err) {
        console.error('Error countLikes:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
