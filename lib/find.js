
var api = require('./api')

module.exports = function(path) {
  return api.services[path] || false;
}