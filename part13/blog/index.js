require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const blogController = require('./controllers/blog.controller');

app.use(express.json());

app.get('/api/blogs', async (_, res) => {
  try {
    const blogs = await blogController.getBlogs();
    res.json(blogs);
  } catch (e) {
    res.status(404).json(e);
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = await blogController.createBlog(req.body);
    res.json(newBlog);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await blogController.deleteBlog(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(404).end();
  }
});

app.listen(process.env.PORT | 3001, () => {
  console.log('Listening on port 3001');
});
