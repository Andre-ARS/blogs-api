const express = require('express');
const { categoriesController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.use(authMiddleware.validateToken);

categoriesRoute.post('/', categoriesController.createCategory);

module.exports = categoriesRoute;