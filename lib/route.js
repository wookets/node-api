
var _ = require('lodash');
var api = require('./api');

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(options) {
  if (!options) options = {};

  return function(req, res, next) {
    var ctx = {};
    ctx.req = req;
    ctx.res = res;
    ctx.user = req.user || req.session;
    ctx.params = _.extend(req.body, req.query) || {};
    ctx.params.files = req.files;
    api.invoke(req.path, ctx, function(err, result) {
      if (err) return next(err);
      if (options.jsend) return res.send({status: 'success', data: result});
      res.send(result);
    });
  }
}