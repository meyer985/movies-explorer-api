const bcrypt = require('bcryptjs');
const encrypt = require('jsonwebtoken');
const UserModel = require('../models/users');
const ConflictError = require('../errors/ConflictError');
const InvalidRequest = require('../errors/InvalidRequest');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const ServerError = require('../errors/ServerError');

const { NODE_ENV, SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const { id } = req.headers;

  UserModel.findById(id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 8)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Указанный Email уже зарегистрирован'));
          } else if (err.name === 'ValidationError') {
            next(new InvalidRequest('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неправильные логин или пароль');
      } else {
        bcrypt.compare(password, user.password)
          .then((matching) => {
            if (!matching) {
              throw new AuthError('Неправильные логин или пароль');
            } else {
              const token = encrypt.sign({ id: user._id }, NODE_ENV === 'production' ? SECRET : 'key', { expiresIn: '7d' });
              if (!token) {
                throw new ServerError('Ошибка сервера');
              } else {
                res.status(200).send({ jwt: token });
              }
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { id } = req.headers;
  const { email, name } = req.body;
  UserModel.findByIdAndUpdate(id, { email, name }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Указанный Email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};
