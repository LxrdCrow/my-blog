const { Tag } = require('../models');

// Tag by ID
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json({ tags });
    } catch (err) {
        console.error('Error getAllTags:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// New tag creation
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Name is required' });

        const existing = await Tag.findOne({ where: { name } });
        if (existing) return res.status(409).json({ message: 'Tag already exists' });

        const tag = await Tag.create({ name });
        res.status(201).json({ message: 'Tag created', tag });
    } catch (err) {
        console.error('Error createTag:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete tag
exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);
        if (!tag) return res.status(404).json({ message: 'Tag not found' });

        await tag.destroy();
        res.status(200).json({ message: 'Tag deleted' });
    } catch (err) {
        console.error('Error deleteTag:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
