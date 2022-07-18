const Joi = require('joi');
const Sequelize = require('sequelize');
const {
  Category,
  BlogPost,
  PostCategory,
  User,
} = require('../database/models');
const config = require('../database/config/config');

const ERROR_MESSAGE = 'Some required fields are missing';

const INCLUDE_OPTIONS = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const sequelize = new Sequelize(config.development);

let validIds = [];

const validateId = async (data) => {
  const idIsValid = await Category.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: data,
      },
    },
  });

  if (idIsValid.length < 1) throw Error('"categoryIds" not found');

  validIds = [];
  idIsValid.forEach(({ dataValues: { id } }) => validIds.push(id));
};

const validateBody = async (data) => {
  const schema = Joi.object({
    title: Joi.string().empty().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().min(1).required(),
  }).messages({
    'any.required': ERROR_MESSAGE,
    'array.min': ERROR_MESSAGE,
    'string.empty': ERROR_MESSAGE,
  });

  const { error } = schema.validate(data);

  if (error) {
    throw error;
  } else {
    await validateId(data.categoryIds);
  }
};

const addPost = async ({ title, content, categoryIds, userId }) => {
  const t = await sequelize.transaction();

  try {
    await validateBody({ title, content, categoryIds });

    const { dataValues } = await BlogPost.create(
      { title, content, userId, published: Date.now(), updated: Date.now() },
      { transaction: t },
    );

    await PostCategory.bulkCreate(
      validIds.map((categoryId) => ({ postId: dataValues.id, categoryId })),
      { transaction: t },
    );

    await t.commit();

    return { code: 201, result: dataValues };
  } catch ({ message }) {
    t.rollback();
    return { code: 400, result: { message } };
  }
};

const getAllPosts = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: INCLUDE_OPTIONS,
    });

    return { code: 200, result: posts };
  } catch ({ message }) {
    return { code: 500, result: { message } };
  }
};

const getPostById = async (id) => {
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: INCLUDE_OPTIONS,
    });

    if (!post) return { code: 404, result: { message: 'Post does not exist' } };

    return { code: 200, result: post };
  } catch ({ message }) {
    return { code: 500, result: { message } };
  }
};

const validateUser = async (userId, postId) => {
  const { result: { dataValues } } = await getPostById(postId);

  if (dataValues.user.id !== userId) throw new Error('Unauthorized user');

  return dataValues;
};

const updatePost = async ({ id, title, content, userId }) => {
  try {
    if (!title || !content) return { code: 400, result: { message: ERROR_MESSAGE } };

    const post = await validateUser(userId, id);

    await BlogPost.update({ title, content },
      { where: { id }, returning: true });
    
    return { code: 200, result: { ...post, title, content } };
  } catch ({ message }) {
    return message.includes('Unauthorized')
      ? { code: 401, result: { message } }
      : { code: 500, result: { message } };
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
};
