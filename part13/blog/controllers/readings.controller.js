const router = require('express').Router();
const { ReadingList } = require('../models');
const userTokenExtractor = require('../middleware/userTokenExtractor');

router.post('/', async (req, res) => {
  const newReading = await ReadingList.create(req.body);
  res.status(201).json(newReading);
});

router.put('/:id', userTokenExtractor, async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id);

  if (req.user.id !== entry.userId) {
    throw new Error(
      'Unauthorized. You must be the user who created the reading list to edit it.'
    );
  }

  entry.isRead = req.body.read;
  await entry.save();
  res.status(204).json(entry);
});

module.exports = router;
