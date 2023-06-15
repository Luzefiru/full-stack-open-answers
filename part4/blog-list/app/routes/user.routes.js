const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.post('/', async (req, res, next) => {
  res.status(200).send('Hello World');
});

module.exports = userRouter;
