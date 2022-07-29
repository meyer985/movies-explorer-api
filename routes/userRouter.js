const userRouter = require('express').Router();
const { getUser } = require('../controllers/userControllers');

userRouter.get('/me', getUser);

module.exports = userRouter;
