const express = require('express');
const { blogPostsController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const postsRoute = express.Router();

postsRoute.use(authMiddleware.validateToken);

postsRoute.get('/', blogPostsController.getAllPosts);
postsRoute.get('/:id', blogPostsController.getPostById);
postsRoute.post('/', blogPostsController.addPost);
postsRoute.put('/:id', blogPostsController.updatePost);

module.exports = postsRoute;
