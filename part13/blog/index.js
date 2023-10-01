const express = require('express');
const app = express();
require('express-async-errors');
app.use(express.json());

// Routes
const blogRouter = require('./controllers/blog.controller');
app.use(blogRouter);

// Error Handling
const { errorHandlerMiddleware, unknownRouteHandler } = require('./middleware');
app.use(unknownRouteHandler);
app.use(errorHandlerMiddleware);

// Server Initialization
const { PORT } = require('./util/config');
app.listen(PORT, () => {
  console.log('Listening on port 3001');
});
