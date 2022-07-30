const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const { auth } = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const mainRouter = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use((err, req, res, next) => {
  if (!err.statusCode === '500' || !err.statusCode) {
    res.status(500).send({ message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
