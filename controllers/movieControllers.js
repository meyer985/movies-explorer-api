const MovieModel = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const InvalidRequest = require('../errors/InvalidRequest');
const ForbiddenError = require('../errors/InvalidRequest');

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
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  MovieModel.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner: id,
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

/* ПРОВЕРКА ПОЛЬЗОВАТЛЯ ПЕРЕД УДАЛЕНИЕМ */
module.exports.deleteMovie = (req, res, next) => {
  const id = req.params._id;
  MovieModel.findById(id)
    .then((result) => {

    });

  MovieModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Фильм не найден');
      } else {
        res.status(200).send({ data: result });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ForbiddenError('Передан некорректный Id'));
      } else {
        next(err);
      }
    });
};
