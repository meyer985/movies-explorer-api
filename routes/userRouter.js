const userRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/userControllers');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
