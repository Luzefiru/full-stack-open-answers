const { logger } = require('../utils');

const errorHandler = (err, req, res) => {
  logger.error(err.message);

  res.status(500).json({ error: 'unknown server error' });
};

module.exports = errorHandler;
