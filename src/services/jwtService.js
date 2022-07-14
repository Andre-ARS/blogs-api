require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (userInfo) => {
  const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);

    return data;
  } catch ({ message }) {
    return message.includes('provided')
      ? { code: 401, result: { message: 'Token not found' } }
      : { code: 401, result: { message: 'Expired or invalid token' } };
  }
};

module.exports = {
  createToken,
  validateToken,
};
