const { Comment, Like, Bookmark, User } = require('../models');

const postHelper = {
    async formatPost(postInstance, currentUserId = null) {
        const post = postInstance.toJSON();

        // Add author's public info
        const author = await User.findByPk(post.userId, {
            attributes: ['id', 'name', 'username', 'profilePicture']
        });

        // Count likes, comments, bookmarks
        const [likeCount, commentCount, bookmarkCount] = await Promise.all([
            Like.count({ where: { postId: post.id } }),
            Comment.count({ where: { postId: post.id } }),
            Bookmark.count({ where: { postId: post.id } }),
        ]);

        // Check if current user liked or bookmarked
        let liked = false;
        let bookmarked = false;

        if (currentUserId) {
            const [like, bookmark] = await Promise.all([
                Like.findOne({ where: { postId: post.id, userId: currentUserId } }),
                Bookmark.findOne({ where: { postId: post.id, userId: currentUserId } }),
            ]);
            liked = !!like;
            bookmarked = !!bookmark;
        }

        return {
            ...post,
            author,
            stats: {
                likeCount,
                commentCount,
                bookmarkCount,
                liked,
                bookmarked
            }
        };
    }
};

module.exports = postHelper;
