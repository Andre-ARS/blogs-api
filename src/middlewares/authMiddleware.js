const { jwtService } = require('../services');

const validateToken = (req, res, next) => {
  const { authentication } = req.headers;

  const user = jwtService.validateToken(authentication);

  if (user.code) {
    return res.status(user.code).json(user.result);
  }

  next();
};

module.exports = {
  validateToken,
};
