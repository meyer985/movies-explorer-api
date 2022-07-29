const encrypt = require('jsonwebtoken');
const UserModel = require('../models/users');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new Error('Ошибка авторизации'));
    return;
  }

  const userId = encrypt.verify(authorization.split(' ')[1], 'key');

  UserModel.findById(userId)
    .then((result) => {
      if (!result) {
        throw new Error('Пользователь не найден');
      }
    })
    .catch((err) => next(err));

  req.headers.id = userId;
  next();
};
