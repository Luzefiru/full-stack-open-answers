const Blog = require('../models/blog.model');

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs;
  } catch (err) {
    throw err;
  }
};

const postBlog = async (blog) => {
  try {
    const newBlog = await Blog.create(blog);
    return newBlog;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllBlogs, postBlog };
