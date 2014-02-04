
var api = require('./api');

/**
 *  A method which can be used internally on the server.
 */
module.exports = function(path, params, session, callback) {
  // make sure path is valid
  if (!api.check(path, callback)) return;
  // check secure
  if (!api.secure(path, params, session, callback)) return;
  // check params
  if (!api.validate(path, params, session, callback)) return;
  // invoke
  api.services[path].method(params, session, callback);
}