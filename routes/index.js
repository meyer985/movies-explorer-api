const mainRouter = require('express').Router();
const { signupValidation, signinValidation } = require('../utils/validation');

const { addUser, loginUser } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const NotFoundError = require('../errors/NotFoundError');

mainRouter.post('/signup', signupValidation, addUser);

mainRouter.post('/signin', signinValidation, loginUser);

mainRouter.use(auth);
mainRouter.use('/users', userRouter);
mainRouter.use('/movies', movieRouter);
mainRouter.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = mainRouter;
