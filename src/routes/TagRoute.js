const express = require('express');
const router = express.Router();

const TagController = require('../controllers/TagController');

router.get('/', TagController.getAllTags);

router.get('/:id', TagController.getTagById);

module.exports = router;
