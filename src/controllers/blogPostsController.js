const { blogPostsService } = require('../services');

const addPost = async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };

  const { code, result } = await blogPostsService.addPost(postInfo);

  return res.status(code).json(result);
};

const getAllPosts = async (_req, res) => {
  const { code, result } = await blogPostsService.getAllPosts();

  return res.status(code).json(result);
};

module.exports = {
  addPost,
  getAllPosts,
};
