const { User, Blog } = require('../models');
const router = require('express').Router();
const userTokenExtrator = require('../middleware/userTokenExtractor');

router.get('/', async (_, res) => {
  const users = await User.findAll({ include: { model: Blog } });
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

router.use(userTokenExtrator);

router.put('/:username', async (req, res) => {
  const targetUser = req.user;
  targetUser.username = req.body.username;
  targetUser.save();
  res.status(200).json(targetUser);
});

module.exports = router;
