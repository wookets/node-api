
var api = require('./api');
var validate = require('validate');

/**
 *  A method which can be used internally on the server.
 */
module.exports = function(path, params, user, callback) {
  var service = api.find(api.services, path);
  // make sure path is valid
  if (!service) {
    var err = Error('Service ' + path + ' not found.');
    err.name = 'ServiceNotFound';
    return callback(err);
  }
  // check secure
  api.secure(service, user, function(err) {
    if (err) return callback(err);
    // check params
    api.validate(service, params, function(err) {
      if (err) return callback(err);
      // invoke
      service.fn(params, user, callback);
    });
  });
}