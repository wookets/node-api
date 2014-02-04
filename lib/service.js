
var _ = require('lodash');
var api = require('./api');

/**
 * A method to register services to the api so they can be invoked later.
 * def = {path: '/path', access: ['public'], params: {}, method: (ctx, callback)}
 */
module.exports = function(path, def) {
  if (!path || !_.isString(path)) throw Error("Service #{path} misconfigured. No path provided.");
  if (!def.method) throw Error("Service #{path} misconfigured. No method provided.");
  if (_.isEmpty(def.access)) def.access = [];
  if (_.isString(def.access)) def.access = [def.access]; // allow access to be a string
  if (_.isEmpty(def.params)) def.params = {};
  api.services[path] = def;
}
