const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
  const tokenString = req.get('authorization');

  if (!tokenString || !tokenString.startsWith('Bearer ')) {
    throw new jwt.JsonWebTokenError('no Authorization Bearer header found');
  }

  const tokenHash = tokenString.replace('Bearer ', '');

  try {
    const tokenPayload = jwt.verify(tokenHash, process.env.JWT_SECRET);
    req.token = tokenPayload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtAuth;
