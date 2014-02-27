
var _ = require('lodash');
var api = require('./api');

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(req, res, next) {
  var params = _.extend(req.body, req.query);
  var service = api.find(req.path);
  if (service && service.params && service.params.req) {
    params.req = req;
  }
  if (service && service.params && service.params.res) {
    params.res = res;
  }
  var user = req.user || req.session;
  api.invoke(req.path, params, user, function(err, result) {
    if (err) return next(err);
    if (api.jsend) {
      res.send({status: 'success', data: result});
    } else {
      res.send(result);
    }
  });
}