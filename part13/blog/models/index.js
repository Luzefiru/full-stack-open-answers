const Blog = require('./blog.model');
const User = require('./user.model');

User.hasMany(Blog, { foreignKey: { name: 'author', allowNull: false } });
Blog.belongsTo(User, { foreignKey: { name: 'author', allowNull: false } });
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Blog,
  User,
};
