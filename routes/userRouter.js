const userRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/userControllers');
const { userPatchValidation } = require('../utils/validation');

userRouter.get('/me', getUser);

userRouter.patch('/me', userPatchValidation, updateUser);

module.exports = userRouter;
