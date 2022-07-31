module.exports.errorHandler = (err, req, res, next) => {
  if (!err.statusCode === '500' || !err.statusCode) {
    res.status(500).send({ message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};
