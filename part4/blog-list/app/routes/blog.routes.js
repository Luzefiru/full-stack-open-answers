const blogRouter = require('express').Router();
const blogController = require('../controllers/blog.controller.js');
const userController = require('../controllers/user.controller.js');

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
    // get a random ObjectId from the 'users' database to populate the `user` field
    const listOfUsers = await userController.getAllUsers();
    const userId = listOfUsers[0]._id;

    // save the blog
    const newBlog = await blogController.postBlog(blogData, userId);

    console.log('newBlog', newBlog);

    // add the blog to the user
    await userController.addBlogToUser(userId, newBlog._id);
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
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'no blog with that id found' });
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.patch('/:id', async (req, res, next) => {
  const blogId = req.params.id;
  const updateObj = req.body;

  try {
    const updatedBlog = await blogController.updateBlog(blogId, updateObj);

    if (updatedBlog === null) {
      res.status(404).json({ error: 'no blog with that id found' });
    } else {
      res.status(200).json(updatedBlog);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
