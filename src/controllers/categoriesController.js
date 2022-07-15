const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const { code, result } = await categoriesService.createCategory(name);

  return res.status(code).json(result);
};

module.exports = {
  createCategory,
};
