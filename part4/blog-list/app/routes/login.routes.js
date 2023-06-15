const loginRouter = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    const isCorrectPassword =
      user === null ? null : await bcrypt.compare(password, user.password);

    // catchers for bad input
    if (!user) {
      return res
        .status(400)
        .json({ error: 'user with that username does not exist' });
    } else if (!isCorrectPassword) {
      return res.status(400).json({ error: 'invalid password' });
    }

    // otherwise, validate the user and send back a token
    const token = jwt.sign(
      { id: user._id, username, name: user.name },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, username, name: user.name });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
