const express = require('express');
const router = express.Router();

const LikeController = require('../controllers/LikeController');

router.post('/', LikeController.createLike);

router.get('/', LikeController.getAllLikes);

router.get('/:id', LikeController.getLikeById);

router.delete('/:id', LikeController.deleteLike);

module.exports = router;
