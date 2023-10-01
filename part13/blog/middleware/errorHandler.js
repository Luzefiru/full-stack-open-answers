const errorHandlerMiddleware = (err, _, res, __) => {
  console.log(err);
  console.log(err.name);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'bad user input' });
  }

  if (err.name === 'TypeError') {
    return res.status(404).json({ error: 'blog id not found' });
  }

  res.status(500).json({ error: 'internal server error' });
};

module.exports = errorHandlerMiddleware;
