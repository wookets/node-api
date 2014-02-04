
var assert = require('assert');
var api = require('../');

describe('api.service()', function() {

  it('should throw an error if no path defined when registering a service', function(done) {
    assert.throws(function() {api.service()}, Error);
    done();
  });

  it('should throw an error if no method defined when registering a service', function(done) {
    assert.throws(function() {api.service('/path')}, Error)
    done();
  });

  it('should register a valid service', function(done) {
    api.service('/service54', {method: function() {}});
    assert(api.services['/service54']);
    done();
  });

});
