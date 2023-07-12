const { logger } = require('../utils');

const errorHandler = (err, req, res, next) => {
  logger.error(err.name, err.message);

  if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'input validation error' });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' });
  } else {
    res.status(500).json({ error: 'unknown server error' });
  }
};

module.exports = errorHandler;
