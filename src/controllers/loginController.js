const { loginService } = require('../services');

const signIn = (req, res) => {
  const userInfo = req.body;

  const { code, result } = loginService.signIn(userInfo);

  return res.status(code).json(result);
};

module.exports = signIn;
