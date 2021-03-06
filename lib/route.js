
var _ = require('lodash');
var api = require('./api');

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(options) {
  if (!options) options = {};

  return function(req, res, next) {
    // resolve params
    var params = _.extend(req.body, req.query);

    // resolve user
    var user = req.user || req.session;

    // attach req, res, or files if requested
    var service = api.find(req.path);
    if (service && service.params && service.params.req) {
      params.req = req;
    }
    if (service && service.params && service.params.res) {
      params.res = res;
    }
    if (service && service.params && service.params.files) {
      params.files = req.files;
    }

    api.invoke(req.path, params, user, function(err, result) {
      if (err) return next(err);
      if (options.jsend) return res.send({status: 'success', data: result});
      res.send(result);
    });
  }
};
