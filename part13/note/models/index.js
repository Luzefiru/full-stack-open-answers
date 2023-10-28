const Note = require('./note.model');
const User = require('./user.model');
const Team = require('./team.model');
const Membership = require('./membership.model');
const UserNotes = require('./userNotes.model');

User.hasMany(Note);
Note.belongsTo(User);

Team.belongsToMany(User, { through: Membership });
User.belongsToMany(Team, { through: Membership });

User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' });
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' });

module.exports = {
  Note,
  User,
  Team,
  Membership,
  UserNotes,
};
