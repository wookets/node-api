
var api = require('./api');

/**
 *  A method which can be used internally on the server.
 */
module.exports = function(path, ctx, callback) {
  var service = api.find(path);
  // make sure path is valid
  if (!service) {
    var err = Error('Service ' + path + ' not found.');
    err.name = 'NotFound';
    err.status = 404;
    return callback(err);
  }
  if (!ctx) ctx = {};
  if (!ctx.user) ctx.user = {};
  if (!ctx.params) ctx.params = {};

  // check secure
  api.secure(service, ctx.user, function(err) {
    if (err) return callback(err);
    // check params
    api.validate(service, ctx.params, function(err) {
      if (err) return callback(err);
      // invoke
      ctx.send = function(data) {
        callback(null, data);
      };
      ctx.throw = function(msg, status) {
        if (msg && isNumber(msg)) {
          status = msg;
        }
        var err = new Error(msg);
        err.status = status;
        callback(err);
      };
      service.fn(ctx);
    });
  });
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}