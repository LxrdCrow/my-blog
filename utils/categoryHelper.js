const Category = require('../models/Category');

/**
 * @param {String} name 
 * @returns {Object|null}
 */

const findCategoryByName = async (name) => {
    return await Category.findOne({ name: name.trim().toLowerCase() });
};

/**
 * Create or find a category by name
 * @param {String} name 
 * @returns {Object} 
 */
const createOrFindCategory = async (name) => {
    const normalized = name.trim().toLowerCase();
    let category = await Category.findOne({ name: normalized });

    if (!category) {
        category = await Category.create({ name: normalized });
    }

    return category;
};

/**
 * Normalize categories by removing duplicates and trimming whitespace
 * @param {Array} categories -
 * @returns {Array} 
 */
const normalizeCategories = (categories) => {
    const seen = new Set();
    return categories
        .map(c => c.trim().toLowerCase())
        .filter(c => {
            if (seen.has(c)) return false;
            seen.add(c);
            return true;
        });
};

module.exports = {
    findCategoryByName,
    createOrFindCategory,
    normalizeCategories,
};
