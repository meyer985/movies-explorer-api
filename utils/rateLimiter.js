const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Превышено количество запросов',
  headers: true,
});