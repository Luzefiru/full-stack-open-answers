const Note = require('./note.model');
const User = require('./user.model');
const Team = require('./team.model');
const Membership = require('./membership.model');

User.hasMany(Note);
Note.belongsTo(User);

Team.belongsToMany(User, { through: Membership });
User.belongsToMany(Team, { through: Membership });

module.exports = {
  Note,
  User,
  Team,
  Membership,
};
