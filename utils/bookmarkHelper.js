const Bookmark = require('../models/Bookmark');

const toggleBookmark = async (userId, postId) => {
    const existing = await Bookmark.findOne({ user: userId, post: postId });

    if (existing) {
        await existing.deleteOne();
        return { bookmarked: false };
    } else {
        await Bookmark.create({ user: userId, post: postId });
        return { bookmarked: true };
    }
};

const isBookmarked = async (userId, postId) => {
    const bookmark = await Bookmark.findOne({ user: userId, post: postId });
    return !!bookmark;
};

const getBookmarkedPosts = async (userId) => {
    const bookmarks = await Bookmark.find({ user: userId }).populate('post');
    return bookmarks.map(b => b.post);
};

module.exports = {
    toggleBookmark,
    isBookmarked,
    getBookmarkedPosts,
};
