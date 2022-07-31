module.exports.corsConfig = {
  origin: ['http://localhost:3000',
    'http://meyer985diplom.nomoredomains.xyz',
    'https://meyer985diplom.nomoredomains.xyz'],
  credentials: true,
};

module.exports.AUTH_ERROR_CODE = 401;
module.exports.CONFLICT_ERROR_CODE = 409;
module.exports.BAD_REQUEST_CODE = 400;
module.exports.NOT_FOUND_CODE = 404;
module.exports.SERVER_ERROR_CODE = 500;
module.exports.FORBIDDEN_CODE = 403;
