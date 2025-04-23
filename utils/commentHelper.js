const { User, Like } = require('../models');

const commentHelper = {
    async formatComment(commentInstance, currentUserId = null) {
        const comment = commentInstance.toJSON();

        // Get author's public info
        const author = await User.findByPk(comment.userId, {
            attributes: ['id', 'name', 'username', 'profilePicture']
        });

        const likeCount = await Like.count({ where: { commentId: comment.id } });

        // Check if current user liked this comment
        let liked = false;
        if (currentUserId) {
            const like = await Like.findOne({
                where: { commentId: comment.id, userId: currentUserId }
            });
            liked = !!like;
        }

        return {
            ...comment,
            author,
            stats: {
                likeCount,
                liked
            }
        };
    },
    
    async formatComments(commentInstances, currentUserId = null) {
        return Promise.all(
            commentInstances.map(comment =>
                this.formatComment(comment, currentUserId)
            )
        );
    }
};

module.exports = commentHelper;
