const { BAD_REQUEST_CODE } = require('../utils/constants');

class InvalidRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_CODE;
  }
}

module.exports = InvalidRequest;
