const { Blog } = require('../models');
const Router = require('express').Router;

const router = Router();

router.get('/api/blogs', async (_, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/api/blogs', async (req, res) => {
  const newBlog = await Blog.create(req.body);
  res.json(newBlog);
});

router.delete('/api/blogs/:id', async (req, res) => {
  const targetBlog = await Blog.findByPk(req.params.id);
  targetBlog.destroy();
  res.status(204).end();
});

router.put('/api/blogs/:id', async (req, res) => {
  const targetBlog = await Blog.findByPk(req.params.id);
  targetBlog.likes += 1;
  targetBlog.save();
  res.status(200).json({ likes: targetBlog.likes });
});

module.exports = router;
