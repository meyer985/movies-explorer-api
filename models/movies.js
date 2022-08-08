const mongoose = require('mongoose');
/* ВЫНЕСИ РЕГУЛЯРКУ В КОНСТАНТУ */

const requiredTestedURL = {
  type: String,
  required: true,
  validate: {
    validator(e) {
      return /https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/.test(e);
    },
    message: 'Необходим URL',
  },
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: requiredTestedURL,
  trailerLink: requiredTestedURL,
  thumbnail: requiredTestedURL,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
