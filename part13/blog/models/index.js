const Blog = require('./Blog.model');
const User = require('./User.model');
const ReadingList = require('./ReadingList.model');

User.hasMany(Blog, { foreignKey: { name: 'author', allowNull: false } });
Blog.belongsTo(User, { foreignKey: { name: 'author', allowNull: false } });

User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

module.exports = {
  Blog,
  User,
  ReadingList,
};
