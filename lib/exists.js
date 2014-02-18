
var _ = require('lodash');
var api = require('./api');

module.exports = function(path, callback) {
  var def = api.services[path];
  if (def) {
    return true;
  } else {
    if (_.isFunction(callback)) {
      var err = Error('Service ' + path + ' not found.');
      err.name = 'ServiceNotFound';
      callback(err);
    }
    return false;
  }
}