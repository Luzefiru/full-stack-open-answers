const { User } = require('../models');
const router = require('express').Router();

router.get('/', async (_, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

router.put('/:username', async (req, res) => {
  const targetUser = await User.findOne({
    where: { username: req.params.username },
  });
  targetUser.username = req.body.username;
  targetUser.save();
  res.status(200).json(targetUser);
});

module.exports = router;
