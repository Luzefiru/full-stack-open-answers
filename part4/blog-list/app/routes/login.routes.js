const loginRouter = require('express').Router();
const loginController = require('../controllers/login.controller');

loginRouter.post('/', (req, res) => {
  loginController.helloWorld();
  res.status(200).send('connected route');
});

module.exports = loginRouter;
