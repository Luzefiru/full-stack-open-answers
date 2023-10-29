const express = require('express');
const app = express();
require('express-async-errors');
app.use(express.json());

// Routes
const blogRouter = require('./controllers/blog.controller');
const userRouter = require('./controllers/user.controller');
const loginRouter = require('./controllers/login.controller');
const authorRouter = require('./controllers/author.controller');
const readingListRouter = require('./controllers/readings.controller');
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListRouter);

// Error Handling
const { errorHandlerMiddleware, unknownRouteHandler } = require('./middleware');
app.use(unknownRouteHandler);
app.use(errorHandlerMiddleware);

// Server Initialization
const { PORT } = require('./util/config');
app.listen(PORT, () => {
  console.log('Listening on port 3001');
});
