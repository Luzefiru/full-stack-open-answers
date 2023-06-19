const testRouter = require('express').Router();
const User = require('../models/user.model');
const Blog = require('../models/blog.model');

testRouter.post('/reset', async (req, res, next) => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    res.status(200).json({ message: 'Successfully reset test database' });
  } catch (err) {
    next(err);
  }
});

module.exports = testRouter;
