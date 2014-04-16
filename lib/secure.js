
var _ = require('lodash');
var api = require('./api');

module.exports = function(service, params, user, callback) {
  // check access first
  if (_.contains(service.access, 'public')) return callback();
  if (!user) user = {roles: []};
  if (!_.any(service.access, function(role) {return _.contains(user.roles, role)})) {
    var err = Error('Not authorized to invoke the ' + service.path + ' service.');
    err.status = 403;
    err.name = 'NotAuthorized';
    return callback(err);
  }
  // check secure function
  service.secure(params, user, callback);
}
