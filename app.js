const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const { getUser, addUser } = require('./controllers/userControllers');
const userRouter = require('./routes/userRouter');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.post('/users', addUser);

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
