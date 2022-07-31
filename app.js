const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const { errors } = require('celebrate');
const cors = require('cors');
const { auth } = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const mainRouter = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const corsConfig = {
  origin: ['http://localhost:3000',
    'http://meyer985diplom.nomoredomains.xyz',
    'https://meyer985diplom.nomoredomains.xyz'],
  credentials: true,
};

app.use(cors(corsConfig));

app.use(mainRouter);
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
