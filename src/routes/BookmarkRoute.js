const express = require('express');
const router = express.Router();

const BookmarkController = require('../controllers/BookmarkController');

router.post('/', BookmarkController.createBookmark);

router.get('/', BookmarkController.getAllBookmarks);

router.get('/:id', BookmarkController.getBookmarkById);

router.delete('/:id', BookmarkController.deleteBookmark);

module.exports = router;
