const Joi = require('joi');
const { User } = require('../database/models/index');
const { createToken } = require('./jwtService');

const validateBody = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  });

  const { error, value } = schema.validate(data);

  if (error) throw error;

  return value;
};

const createUser = async (userInfo) => {
  try {
    const info = validateBody(userInfo);
    const user = await User.findOne({
      where: { email: info.email, password: info.password },
    });

    if (user) {
      return { code: 409, result: { message: 'User already registered' } };
    }

    const { dataValues: { id } } = await User.create(info);

    delete info.password;

    const token = createToken({ id, ...info });

    return { code: 201, result: { token } };
  } catch ({ message }) {
    return { code: 400, result: { message } };
  }
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { code: 200, result: users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) return { code: 404, result: { message: 'User does not exist' } };

  return { code: 200, result: user };
};

const removeUser = async (id) => {
  try {
    await User.destroy({ where: { id } });

    return { code: 204 };
  } catch ({ message }) {
    return { code: 500, result: { message } };
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUser,
};
