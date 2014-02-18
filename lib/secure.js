
var _ = require('lodash');
var api = require('./api');

module.exports = function(def, user, callback) {
  if (_.contains(def.access, 'public')) return true;
  if (!_.any(def.access, function(role) {return _.contains(user.roles, role)})) {
    var err = Error('Not authorized to invoke the ' + def.path + ' service.');
    err.name = 'NotAuthorized';
    callback(err);
    return false;
  }
  return true;
}
