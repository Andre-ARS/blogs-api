const Joi = require('joi');
const { jwtService } = require('.');
const User = require('../database/models/user');

const validateBody = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({
    'any.required': 'Some required fields are missing',
  });

  const { error } = schema.validate(data);

  if (error) return { message: error.message };
};

const signIn = (userInfo) => {
  const user = User.findOne({ where: { ...userInfo } });

  if (!user) return { code: 400, result: { message: 'Invalid fields' } };
  if (validateBody(userInfo)) return { code: 400, result: validateBody(userInfo) };

  const { password: _, ...userWithoutPassword } = user;

  const token = jwtService.createToken(userWithoutPassword.dataValues);

  return { code: 200, result: token };
};

module.exports = {
  signIn,
};
