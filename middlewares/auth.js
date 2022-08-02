const encrypt = require('jsonwebtoken');
const UserModel = require('../models/users');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthError('Ошибка авторизации'));
    return;
  }

  let payload;
  try {
    payload = encrypt.verify(authorization.split(' ')[1], NODE_ENV === 'production' ? SECRET : 'key');
  } catch {
    next(new AuthError('Ошибка авторизации'));
    return;
  }

  UserModel.findById(payload.id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);

  req.headers.id = payload.id;
  next();
};

module.exports = auth;
