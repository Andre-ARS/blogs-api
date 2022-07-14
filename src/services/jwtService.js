require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (userInfo) => {
  const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  return token;
};

module.exports = {
  createToken,
};
