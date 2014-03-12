
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
      ctx.throw = function(status, msg) {
        var err = null;
        // ctx.throw(Error('meow'));
        if (status instanceof Error) {
          err = status;
          err.status = 500;
        }
        // ctx.throw(404, Error('meow'));
        else if (msg instanceof Error) {
          err = msg;
          err.status = status;
        }
        // ctx.throw(400, 'meow');
        else if (isNumber(status)) {
          err = Error(msg);
          err.status = status;
        }
        // ctx.throw('meow');
        else {
          err = Error(status);
          err.status = 500;
        }
        callback(err);
      };
      service.fn(ctx);
    });
  });
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}