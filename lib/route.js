
var _ = require('lodash');
var api = require('./api');

/**
 *  A method to be used in conjunction with an express route.
 */
module.exports = function(options) {
  if (!options) options = {};

  if (!options.response) {
    options.response = function(err, ctx) {
      if (err) {
        ctx.res.send(err.status, err);
      } else {
        ctx.res.send(ctx.result);
      }
    }
  }

  return function(req, res, next) {
    var ctx = {};
    ctx.path = req.path;
    ctx.req = req;
    ctx.res = res;
    ctx.user = req.user || req.session;
    ctx.params = _.extend(req.body, req.query) || {};
    ctx.params.files = req.files;
    api.invoke(ctx.path, ctx, function(err, result) {
      ctx.result = result;
      options.response(err, ctx)
    });
  }
}