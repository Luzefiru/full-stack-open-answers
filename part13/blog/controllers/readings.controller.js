const router = require('express').Router();
const { ReadingList } = require('../models');

router.post('/', async (req, res) => {
  const newReading = await ReadingList.create(req.body);
  res.status(201).json(newReading);
});

module.exports = router;
