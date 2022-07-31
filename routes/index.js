const mainRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { addUser, loginUser } = require('../controllers/userControllers');

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

module.exports = mainRouter;
