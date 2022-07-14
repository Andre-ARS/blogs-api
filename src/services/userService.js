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

    if (user) return { code: 409, result: { message: 'User already registered' } };

    await User.create(info);

    const { password: _, ...userWithoutPassword } = user;

    const token = createToken(userWithoutPassword.dataValues);
  
    return { code: 200, result: { token } };
  } catch ({ message }) {
    return { code: 400, result: { message } };
  }
};

module.exports = {
  createUser,
};
