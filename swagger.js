const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Store Manager',
    description: 'API de um CRUD de vendas e produtos',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Login',
      description: 'Login Endpoint',
    },
    {
      name: 'User',
      description: 'User Endpoints',
    },
    {
      name: 'Categories',
      description: 'Categories Endpoints',
    },
    {
      name: 'Post',
      description: 'Post Endpoints',
    },
  ],
  definitions: {
    Login: {
      $email: 'lewishamilton@gmail.com',
      $password: '123456',
    },
    User: [{
      $id: 1,
      $displayName: 'Lewis Hamilton',
      $email: 'lewishamilton@gmail.com',
      $password: '123456',
      $image: `https://
      upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg`,
    }],
    Categories: [{
      $id: 1,
      $name: 'Inovação',
    }],
    Post: [{
      $id: 1,
      $title: 'Post do Ano',
      $content: 'Melhor post do ano',
      $userId: 1,
      $published: '2011-08-01T19:58:00.000Z',
      $updated: '2011-08-01T19:58:51.000Z',
      $user: {
        $id: 1,
        $displayName: 'Lewis Hamilton',
        $email: 'lewishamilton@gmail.com',
        $image: `https://
        upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg`,
      },
      $categories: [
        {
          $id: 1,
          $name: 'Inovação',
        },
      ],
    }],
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
  // eslint-disable-next-line global-require
  require('./src/server');
});