const blogRouter = require('express').Router();
const blogController = require('../controllers/blog.controller.js');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await blogController.getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/', async (req, res, next) => {
  const blogData = req.body;

  try {
    const newBlog = await blogController.postBlog(blogData);
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
