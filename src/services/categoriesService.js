const { Category } = require('../database/models/index');

const createCategory = async (name) => {
  if (!name) return { code: 400, result: { message: '"name" is required' } };

  const category = await Category.create({ name });

  return { code: 201, result: category };
};

module.exports = {
  createCategory,
};
