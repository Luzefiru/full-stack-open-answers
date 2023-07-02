const blogRouter = require('express').Router();
const blogController = require('../controllers/blog.controller.js');
const userController = require('../controllers/user.controller.js');
const jwtAuth = require('../middleware/jwtAuth.middleware.js');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await blogController.getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/', jwtAuth, async (req, res, next) => {
  const blogData = req.body;
  const { id: userId } = req.token;

  try {
    // save the blog
    const newBlog = await blogController.postBlog(blogData, userId);

    // add the blog to the user
    await userController.addBlogToUser(userId, newBlog._id);
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', jwtAuth, async (req, res, next) => {
  const blogId = req.params.id;
  const { id: tokenUserId } = req.token;

  try {
    const targetBlog = await blogController.getBlog(blogId);

    if (targetBlog === null) {
      return res.status(404).json({ error: 'no blog with that id found' });
    }

    if (targetBlog.user.id.toString() !== tokenUserId) {
      return res
        .status(401)
        .json({ error: 'you are not the owner of this blog' });
    } else {
      const deletedBlog = await blogController.deleteBlog(blogId);

      if (deletedBlog !== null) {
        userController.removeBlogFromUser(tokenUserId, deletedBlog._id);
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'no blog with that id found' });
      }
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

blogRouter.post('/:id/comments', jwtAuth, async (req, res, next) => {
  const blogId = req.params.id;
  const newComment = req.body.comment;

  try {
    const updatedBlog = await blogController.postComment(blogId, newComment);
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
