const { Blog, User } = require('../models');
const Router = require('express').Router;
const userTokenExtractor = require('../middleware/userTokenExtractor');

const router = Router();

router.get('/', async (_, res) => {
  const blogs = await Blog.findAll({ include: { model: User } });
  res.json(blogs);
});

router.use(userTokenExtractor);

router.post('/', async (req, res) => {
  const newBlog = await Blog.create({ ...req.body, author: req.user.id });
  res.json(newBlog);
});

router.put('/:id', async (req, res) => {
  const targetBlog = await Blog.findByPk(req.params.id);
  targetBlog.likes += 1;
  targetBlog.save();
  res.status(200).json({ likes: targetBlog.likes });
});

router.delete('/:id', async (req, res) => {
  const targetBlog = await Blog.findByPk(req.params.id);
  if (targetBlog.author === req.user.id) {
    targetBlog.destroy();
    res.status(204).end();
  } else {
    throw new Error('Authorization error. You do not own this blog!');
  }
});

module.exports = router;
