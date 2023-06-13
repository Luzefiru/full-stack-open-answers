const { logger } = require('./utils');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

module.exports = app;
