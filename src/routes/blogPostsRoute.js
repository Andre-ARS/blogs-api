const express = require('express');
const { blogPostsController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const postsRoute = express.Router();

postsRoute.use(authMiddleware.validateToken);

postsRoute.get('/', blogPostsController.getAllPosts);
postsRoute.post('/', blogPostsController.addPost);

module.exports = postsRoute;
