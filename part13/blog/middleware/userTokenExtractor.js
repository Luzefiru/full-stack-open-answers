const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/config');

module.exports = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith('bearer ')
  ) {
    const toVerify = authorizationHeader.slice(7);
    const { user } = jwt.verify(toVerify, JWT_SECRET);
    const verifiedUser = await User.findOne({
      where: { username: user.username },
    });
    req.user = verifiedUser;
    next();
  } else {
    throw new Error('Authentication failed. Bad token.');
  }
};
