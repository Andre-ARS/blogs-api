const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { router } = require('./routes');
const swaggerFile = require('../swagger_output.json');

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
