
var api = require('./api');
var validate = require('validdate');

/**
 *  A method which can be used internally on the server.
 */
module.exports = function(path, params, user, callback) {
  // make sure path is valid
  if (!api.exists(path, callback)) return;
  var def = api.services[path];
  // check secure
  if (!api.secure(def, user, callback)) return;
  // check params
  var errors = validate(params, def.params);
  if(errors) {
    var err = new Error('One or more params is invalid.');
    err.name = 'InvalidParam';
    err.data = errors;
    return callback(err);
  }
  // invoke
  api.services[path].fn(params, user, callback);
}