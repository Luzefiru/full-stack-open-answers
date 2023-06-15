const Blog = require('../models/blog.model');

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs;
  } catch (err) {
    throw err;
  }
};

const postBlog = async (blog, authorId) => {
  try {
    const newBlog = await Blog.create({ ...blog, user: authorId });
    return newBlog;
  } catch (err) {
    throw err;
  }
};

const deleteBlog = async (blogId) => {
  try {
    const response = await Blog.findByIdAndDelete(blogId).exec();
    return response;
  } catch (err) {
    throw err;
  }
};

const updateBlog = async (blogId, updateObj) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateObj, {
      new: true,
    }).exec();

    return updatedBlog;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllBlogs, postBlog, deleteBlog, updateBlog };
