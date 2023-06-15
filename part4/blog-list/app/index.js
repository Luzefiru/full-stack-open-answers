const { logger } = require('./utils');
const config = require('./config');
const express = require('express');
const cors = require('cors');
const { errorHandler, unknownRouteHandler } = require('./middleware');
const { blogRouter, userRouter } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(unknownRouteHandler);
app.use(errorHandler);

module.exports = app;
