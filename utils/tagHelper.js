/**
 * Normalize tags to a standard format,
 * removes special characters and duplicates.
 * @param {Array<string>} tags - 
 * @returns {Array<string>} - 
 */
function normalizeTags(tags) {
    if (!Array.isArray(tags)) return [];
  
    const cleanedTags = tags
      .map(tag => tag.trim().toLowerCase().replace(/[^\w-]/g, '')) // Only alphanumeric and hyphen
      .filter(tag => tag.length > 0); // Remove empty tags
  
    return [...new Set(cleanedTags)]; // Delete duplicates
  }
  
  /**
   * Chech for validity of tags
   * @param {Array<string>} tags
   * @returns {boolean}
   */
  function areTagsValid(tags) {
    return tags.every(tag => /^[a-z0-9-_]{1,30}$/.test(tag));
  }
  
  module.exports = {
    normalizeTags,
    areTagsValid,
  };
  