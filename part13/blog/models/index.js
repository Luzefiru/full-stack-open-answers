const Blog = require('./blog.model');
const User = require('./user.model');

Blog.sync();
User.sync();

module.exports = {
  Blog,
  User,
};
