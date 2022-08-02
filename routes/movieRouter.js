const movieRouter = require('express').Router();

const { getMovies, postMovie, deleteMovie } = require('../controllers/movieControllers');
const { movieValidation, paramValidation } = require('../utils/validation');

movieRouter.get('/', getMovies);

movieRouter.post('/', movieValidation, postMovie);

movieRouter.delete('/:_id', paramValidation, deleteMovie);

module.exports = movieRouter;
