const express = require('express');
const { userController } = require('../controllers');

const userRoute = express.Router();

userRoute.post('/', userController.createUser);

module.exports = userRoute;
