const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movieControllers');

movieRouter.get('', getMovies);

movieRouter.post('', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/),
    trailerLink: Joi.string().required().regex(/https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/),
    thumbnail: Joi.string().required().regex(/https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);

movieRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = movieRouter;
