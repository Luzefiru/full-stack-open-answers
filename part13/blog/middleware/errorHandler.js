const errorHandlerMiddleware = (err, _, res, __) => {
  console.log(err);
  console.log(err.name);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: [err.message] });
  }

  if (err.name === 'TypeError') {
    return res.status(404).json({ error: [err.message] });
  }

  res.status(500).json({ error: [err.message] });
};

module.exports = errorHandlerMiddleware;
