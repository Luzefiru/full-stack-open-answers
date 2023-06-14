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

blogRouter.delete('/:id', async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await blogController.deleteBlog(blogId);

    if (deletedBlog !== null) {
      res.status(204);
    } else {
      res.status(404).json({ error: 'no blog with that id found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
