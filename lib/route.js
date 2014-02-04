
var api = require('./api')

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(path) {
  if (path == null) {
    path = '/api';
  }
  return function(req, res, next) {
    path = req.path.substring(path.length) // strip out prefix (e.g. '/api') from the path
    params = _.extend(req.body, req.query);
    session = req.user || req.session;
    api.invoke(path, params, session, function(err, result) {
      if (err) return next(err);
      res.send({status: 'success', data: result});
    });
  }
}