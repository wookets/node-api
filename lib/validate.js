
var api = require('./api');

module.exports = function(path, params, session, callback) {
  if (!api.check(path, callback)) return;
  var paramDefs = api.services[path].params;
  // loop over every paramDef and make sure all are valid
  for (var name in paramDefs) {
    var def = paramDefs[name];
    var value = params[name];
    if (def.default) {
      if (value == null) {
        if (_.isFunction(def.default)) {
          value = def.default(params);
        } else {
          value = def.default;
        }
      }
    }
    if (def.required) {
      if (!value || _.isEmpty(value)) {
        callback(invalid(name + ' is required'));
        return false;
      }
    }
    if (!_.isUndefined(def.min)) {
      if (value && value.length < def.min) {
        callback(invalid(name + ' is too short (min: ' + def.min + ')'));
        return false;
      }
    }
    if (!_.isUndefined(def.max)) {
      if (value && value.length > def.max) {
        callback(invalid(name + ' is too long (max: ' + def.max + ')'));
        return false;
      }
    }
    if (def.lowercase) {
      if (value && _.isString(value)) {
        value = value.toLowerCase();
      }
    }
    switch (def.type) {
      case 'string':
      case String:
        if (value && !_.isString(value)) {
          callback(invalid(name + ' is not a String'));
          return false;
        }
        break;
      case 'array':
      case Array:
        if (value && !_.isArray(value)) {
          callback(invalid(name + ' is not an Array'));
          return false;
        }
        break;
      case 'number':
      case Number:
        if (value && !_.isNumber(value)) {
          callback(invalid(name + ' is not a Number'));
          return false;
        }
        break;
      case 'date':
      case Date:
        if (value && !_.isDate(value)) {
          callback(invalid(name + ' is not a Date'));
          return false;
        }
        break;
      case 'bool':
      case 'boolean':
      case Boolean:
        if (value && !_.isBoolean(value)) {
          callback(invalid(name + ' is not a Boolean'));
          return false;
        }
        break;
      case 'object':
      case Object:
        if (value && !_.isObject(value)) {
          callback(invalid(name + ' is not an Object'));
          return false;
        }
        if (def.match) {
          if (value && !value.match(def.match)) {
            callback(invalid(name + ' contains invalid characters'));
            return false;
          }
        }
        break;
    }
  }
  return true;
}

var invalid = function(msg) {
  var err = Error(msg);
  err.name = 'InvalidParam';
  return err;
}