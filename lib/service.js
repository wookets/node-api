
var _ = require('lodash');
var api = require('./api');

/**
 * A method to register services to the api so they can be invoked later.
 * def = {path: '/path', access: ['public'], params: {}, method: (ctx, callback)}
 */
module.exports = function(path, def) {
  if (_.isUndefined(path) || !_.isString(path)) throw Error('Service ' + path + ' misconfigured. No path provided.');
  def.path = path; // we sneak the path into the def, so it could be accessed later if needed
  // make sure fn is provided
  if (_.isUndefined(def.fn) || !_.isFunction(def.fn)) throw Error('Service ' + path + ' misconfigured. No fn provided.');
  // security
  if (_.isEmpty(def.access)) def.access = [];
  if (_.isString(def.access)) def.access = [def.access]; // allow access to be a string
  if (_.isUndefined(def.secure)) def.secure = function(params, user, callback) {callback()};
  // validation
  if (_.isEmpty(def.params)) def.params = {};
  if (_.isUndefined(def.validate)) def.validate = function(params, user, callback) {callback()};
  // register
  api.services[path] = def;
};
