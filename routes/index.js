const mainRouter = require('express').Router();

const { addUser, loginUser } = require('../controllers/userControllers');

mainRouter.post('/signup', addUser);
mainRouter.post('/signin', loginUser);

module.exports = mainRouter;
