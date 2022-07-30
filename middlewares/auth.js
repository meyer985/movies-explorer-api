const encrypt = require('jsonwebtoken');
const UserModel = require('../models/users');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthError('Ошибка авторизации'));
    return;
  }

  const userId = encrypt.verify(authorization.split(' ')[1], 'key');

  UserModel.findById(userId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);

  req.headers.id = userId;
  next();
};