const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/config');
const router = require('express').Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const userToLogin = await User.findOne({ where: { username } });

  if (userToLogin && password === JWT_SECRET) {
    const token = jwt.sign({ user: userToLogin }, JWT_SECRET);
    return res.status(200).json({ token, username, name: userToLogin.name });
  } else {
    throw new Error('Invalid credentials to login.');
  }
});

module.exports = router;
