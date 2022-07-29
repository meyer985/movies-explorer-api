const UserModel = require('../models/users');

module.exports.getUser = (req, res, next) => {
  const { id } = req.headers;
  UserModel.findById(id)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => console.log(err));
};

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  UserModel.create({ name, email, password })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => console.log(err));
};
