const Blog = require('./Blog.model');
const User = require('./User.model');
const ReadingList = require('./ReadingList.model');

User.hasMany(Blog, { foreignKey: { name: 'author', allowNull: false } });
Blog.belongsTo(User, { foreignKey: { name: 'author', allowNull: false } });

User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

// not sure why i need to explicitly say these for eager loading to work
// i get "A is not associated to B!" errors without them
User.hasMany(ReadingList);
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);
ReadingList.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
};
