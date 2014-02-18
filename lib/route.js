
var _ = require('lodash');
var api = require('./api');

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(path) {
  if (_.isUndefined(path)) path = '/api';
  return function(req, res, next) {
    path = req.path.substring(path.length); // strip out prefix (e.g. '/api') from the path
    var params = _.extend(req.body, req.query);
    var user = req.user || req.session;
    api.invoke(path, params, user, function(err, result) {
      if (err) return next(err);
      res.send({status: 'success', data: result});
    });
  }
}