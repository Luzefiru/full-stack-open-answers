const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.get('/', async (req, res, next) => {
  try {
    const userList = await userController.getAllUsers();
    res.status(200).json(userList);
  } catch (err) {
    next(err);
  }
});

userRouter.post('/', async (req, res, next) => {
  const userData = req.body;
  try {
    const newUser = await userController.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
