const Joi = require("joi");
const Sequelize = require("sequelize");
const {
  Category,
  BlogPost,
  PostCategory,
  User,
} = require("../database/models");
const config = require("../database/config/config");

const ERROR_MESSAGE = "Some required fields are missing";

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
    "any.required": ERROR_MESSAGE,
    "array.min": ERROR_MESSAGE,
    "string.empty": ERROR_MESSAGE,
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
      { transaction: t }
    );

    await PostCategory.bulkCreate(
      validIds.map((categoryId) => ({ postId: dataValues.id, categoryId })),
      { transaction: t }
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
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { code: 200, result: posts };
  } catch ({ message }) {
    return { code: 500, result: { message } };
  }
};

module.exports = {
  addPost,
  getAllPosts,
};
