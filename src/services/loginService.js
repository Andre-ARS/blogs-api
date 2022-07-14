const { User } = require('../database/models/index');
const { createToken } = require('./jwtService');

const validateBody = ({ email, password }) => {
  if (!email || !password) return { message: 'Some required fields are missing' };
};

const signIn = async (userInfo) => {
  if (validateBody(userInfo)) {
    return { code: 400, result: validateBody(userInfo) };
  }

  const user = await User.findOne({
    where: { email: userInfo.email, password: userInfo.password },
  });

  if (!user) return { code: 400, result: { message: 'Invalid fields' } };

  delete user.dataValues.password;

  const token = createToken(user.dataValues);

  return { code: 200, result: { token } };
};

module.exports = {
  signIn,
};
