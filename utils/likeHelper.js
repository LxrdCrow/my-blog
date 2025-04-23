const { Like } = require('../models');

const likeHelper = {
    async toggleLike(userId, targetId, targetType) {
        const existingLike = await Like.findOne({
            where: { userId, targetId, targetType }
        });

        if (existingLike) {
            await existingLike.destroy();
            return { liked: false };
        } else {
            await Like.create({ userId, targetId, targetType });
            return { liked: true };
        }
    },

    async countLikes(targetId, targetType) {
        return await Like.count({ where: { targetId, targetType } });
    },

    async isLikedByUser(userId, targetId, targetType) {
        const like = await Like.findOne({
            where: { userId, targetId, targetType }
        });
        return !!like;
    }
};

module.exports = likeHelper;
