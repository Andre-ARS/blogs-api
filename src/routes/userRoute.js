const express = require('express');
const { authMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

const userRoute = express.Router();

userRoute.post('/', userController.createUser);
userRoute.use(authMiddleware.validateToken);
userRoute.get('/', userController.getAllUsers);
userRoute.get('/:id', userController.getUserById);

module.exports = userRoute;
