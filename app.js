const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { auth } = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const mainRouter = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsConfig } = require('./utils/constants');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors(corsConfig));
app.use(helmet());

app.use(mainRouter);
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);
app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
