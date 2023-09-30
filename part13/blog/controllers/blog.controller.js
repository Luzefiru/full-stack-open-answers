const Blog = require('../models/blog.model');

const getBlogs = async () => {
  const blogs = await Blog.findAll();
  return blogs;
};

const createBlog = async (newBlog) => {
  const createdBlog = await Blog.create(newBlog);
  console.log(createdBlog.toJSON());
  return createdBlog;
};

const deleteBlog = async (id) => {
  const targetBlog = await Blog.findByPk(id);
  targetBlog.destroy();

  return targetBlog ? false : true;
};

module.exports = { getBlogs, createBlog, deleteBlog };
