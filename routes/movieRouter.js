const movieRouter = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movieControllers');

movieRouter.get('', getMovies);
movieRouter.post('', postMovie);
movieRouter.delete('/:_id', deleteMovie);

module.exports = movieRouter;
