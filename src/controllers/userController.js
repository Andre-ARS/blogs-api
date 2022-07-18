const { userService } = require('../services');

const createUser = async (req, res) => {
  const userInfo = req.body;

  const { code, result } = await userService.createUser(userInfo);

  return res.status(code).json(result);
};

const getAllUsers = async (_req, res) => {
  const { code, result } = await userService.getAllUsers();

  return res.status(code).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  
  const { code, result } = await userService.getUserById(Number(id));

  return res.status(code).json(result);
};

const removeUser = async (req, res) => {
  const { id } = req.user;
  
  const { code, result } = await userService.removeUser(Number(id));

  return res.status(code).json(result);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUser,
};
