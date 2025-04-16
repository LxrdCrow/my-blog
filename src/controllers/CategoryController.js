const { Category } = require('../models');

// All categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ categories });
    } catch (err) {
        console.error('Error getAllCategories:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Category by ID
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const existing = await Category.findOne({ where: { name } });
        if (existing) return res.status(409).json({ message: 'Category already exists' });

        const category = await Category.create({ name });
        res.status(201).json({ message: 'Category created', category });
    } catch (err) {
        console.error('Error createCategory:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.destroy();
        res.status(200).json({ message: 'Category deleted' });
    } catch (err) {
        console.error('Error deleteCategory:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
