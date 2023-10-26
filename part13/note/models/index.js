const Note = require('./note.model');
const User = require('./user.model');

User.hasMany(Note);
Note.belongsTo(User);

Note.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Note,
  User,
};
