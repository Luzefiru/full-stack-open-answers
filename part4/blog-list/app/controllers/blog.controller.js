const Blog = require('../models/blog.model');

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find({}).populate('user', 'name username id');
    return blogs;
  } catch (err) {
    throw err;
  }
};

const postBlog = async (blog, authorId) => {
  try {
    const newBlog = await Blog.create({ ...blog, user: authorId });
    const newBlogPopulated = await newBlog.populate('user', 'name username id');

    return newBlogPopulated;
  } catch (err) {
    throw err;
  }
};

const deleteBlog = async (blogId) => {
  try {
    const response = await Blog.findByIdAndDelete(blogId)
      .populate('user', 'name username id')
      .exec();
    return response;
  } catch (err) {
    throw err;
  }
};

const updateBlog = async (blogId, updateObj) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateObj, {
      new: true,
    })
      .populate('user', 'name username id')
      .exec();

    return updatedBlog;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllBlogs, postBlog, deleteBlog, updateBlog };
