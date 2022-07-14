const { loginService } = require('../services');

const signIn = async (req, res) => {
  const userInfo = req.body;

  const { code, result } = await loginService.signIn(userInfo);

  return res.status(code).json(result);
};

module.exports = {
  signIn,
};
