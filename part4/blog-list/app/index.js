const { logger } = require('./utils');
const express = require('express');
const { errorHandler, unknownRouteHandler } = require('./middleware');

const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

app.use(unknownRouteHandler);
app.use(errorHandler);

module.exports = app;
