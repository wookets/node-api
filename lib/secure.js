
var _ = require('lodash');
var api = require('./api');

module.exports = function(path, params, session, callback) {
  if (!api.check(path, callback)) return false;
  var def = api.services[path];
  if (_.contains(def.access, 'public')) return true;
  if (!_.any(def.access, function(role) {return _.contains(session.roles, role)})) {
    var err = Error('Not authorized to invoke the ' + path + ' service.');
    err.name = 'NotAuthorized';
    callback(err);
    return false;
  }
  return true;
}
