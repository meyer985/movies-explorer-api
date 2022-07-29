const mongoose = require('mongoose');
const validator = require('email-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.validate(v);
      },
      message: 'Email validation failed',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const user = ret;
    delete user.password;
    return user;
  },
});

module.exports = mongoose.model('user', userSchema);
