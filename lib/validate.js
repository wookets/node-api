
var validate = require('validate');

module.exports = function(service, params, callback) {
  // check params
  var errors = validate(params, service.params);
  if(errors) {
    var err = new Error('One or more params is invalid.');
    err.name = 'InvalidParam';
    err.data = errors;
    return callback(err);
  }
  // check validate function on service def
  service.validate(params, callback);
}