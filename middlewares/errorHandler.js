const { SERVER_ERROR_CODE } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!err.statusCode === '500' || !err.statusCode) {
    res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};
