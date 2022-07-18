const { blogPostsService } = require("../services");

const addPost = async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };

  const { code, result } = await blogPostsService.addPost(postInfo);

  return res.status(code).json(result);
};

const getAllPosts = async (_req, res) => {
  const { code, result } = await blogPostsService.getAllPosts();

  return res.status(code).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { code, result } = await blogPostsService.getPostById(Number(id));

  return res.status(code).json(result);
};
const updatePost = async (req, res) => {
  const {
    params: { id },
    body: { title, content },
    user: { id: userId },
  } = req;

  const { code, result } = await blogPostsService.updatePost({
    id,
    title,
    content,
    userId,
  });

  return res.status(code).json(result);
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
};
