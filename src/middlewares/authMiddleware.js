const { jwtService } = require('../services');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const user = jwtService.validateToken(authorization);

  if (user.code) {
    return res.status(user.code).json(user.result);
  }

  req.user = user;
  next();
};

module.exports = {
  validateToken,
};
