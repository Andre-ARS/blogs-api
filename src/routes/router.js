const express = require('express');
const { authMiddleware } = require('../middlewares');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use(authMiddleware.validateToken);

module.exports = router;
