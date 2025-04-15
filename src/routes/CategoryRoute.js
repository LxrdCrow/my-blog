const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategoryById);

module.exports = router;
