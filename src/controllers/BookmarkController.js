const { Bookmark, Post } = require('../models');

// Add a post to bookmarks
exports.addBookmark = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const existing = await Bookmark.findOne({ where: { postId, userId } });
        if (existing) return res.status(409).json({ message: 'Post already bookmarked' });

        await Bookmark.create({ postId, userId });
        res.status(201).json({ message: 'Post added to bookmarks' });
    } catch (err) {
        console.error('Error addBookmark:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Remove a post from bookmarks
exports.removeBookmark = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const bookmark = await Bookmark.findOne({ where: { postId, userId } });
        if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });

        await bookmark.destroy();
        res.status(200).json({ message: 'Bookmark removed' });
    } catch (err) {
        console.error('Error removeBookmark:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all bookmarks for a user
exports.getUserBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookmarks = await Bookmark.findAll({
            where: { userId },
            include: [{ model: Post }]
        });

        res.status(200).json({ bookmarks });
    } catch (err) {
        console.error('Error getUserBookmarks:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
