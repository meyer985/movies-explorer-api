const MovieModel = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const InvalidRequest = require('../errors/InvalidRequest');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  const { id } = req.headers;
  MovieModel.find({ owner: id })
    .then((result) => {
      if (result.length === 0) {
        throw new NotFoundError('Фильмы не найдены');
      } else {
        res.status(200).send({ data: result });
      }
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const { id } = req.headers;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: id,
  })
    .then((result) => {
      res.status(201).send({ data: result });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.params._id;
  MovieModel.findById(id)
    .then((result) => {
      if (result.owner.toString() === req.headers.id) {
        MovieModel.findByIdAndDelete(id)
          .then((film) => res.status(200).send({ data: film }))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new NotFoundError('Передан некорректный Id'));
            } else {
              next(err);
            }
          });
      } else {
        throw new ForbiddenError('Ошибка доступа');
      }
    })
    .catch(next);
};
