
var _ = require('lodash');
var api = require('./api');

/**
 *  A method which can be used internally on the server.
 */
module.exports = function(path, params, user, callback) {
  var service = api.find(path);
  // make sure path is valid
  if (!service) {
    var err = Error('Service ' + path + ' not found.');
    err.name = 'NotFound';
    err.status = 404;
    return callback(err);
  }

  // check secure
  api.secure(service, params, user, function(err) {
    if (err) return callback(err);
    // check params
    api.validate(service, params, user, function(err) {
      if (err) return callback(err);
      service.fn(params, user, function(err, result) {
        var error = null;
        // callback(Error('meow'))
        if (err instanceof Error) {
          error = err;
          error.status = 500;
        }
        // callback(404, Error('meow'))
        else if (result instanceof Error) {
          error = result;
          error.status = err;
        }
        // callback(400, 'Meow')
        else if (_.isNumber(err)) {
          error = Error(result);
          error.status = err;
        }
        // callback('meow')
        else if (_.isString(err)) {
          error = Error(err);
          error.status = 500;
        }
        callback(error, result);
      });
    });
  });
};
