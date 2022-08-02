const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { addUser, loginUser } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const NotFoundError = require('../errors/NotFoundError');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), addUser);

mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);

mainRouter.use(auth);
mainRouter.use('/users', userRouter);
mainRouter.use('/movies', movieRouter);
mainRouter.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = mainRouter;
