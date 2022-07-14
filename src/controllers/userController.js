const { userService } = require('../services');

const createUser = async (req, res) => {
  const userInfo = req.body;

  const { code, result } = await userService.createUser(userInfo);

  return res.status(code).json(result);
};

module.exports = {
  createUser,
};
