const unknownRouteHandler = (_, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

module.exports = unknownRouteHandler;
