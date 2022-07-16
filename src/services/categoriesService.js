const { Category } = require('../database/models/index');

const createCategory = async (name) => {
  if (!name) return { code: 400, result: { message: '"name" is required' } };
  
  const category = await Category.create({ name });
  
  return { code: 201, result: category };
};

const getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    
    return { code: 200, result: categories };
  } catch ({ message }) {
    return { code: 500, result: { message } };
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
