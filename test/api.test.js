
var assert = require('assert');
var _ = require('lodash');
var api = require('../');

describe('api', function() {

  it('should have an exists() function', function(done) {
    assert(_.isFunction(api.find));
    done();
  });

  it('should have a services object', function(done) {
    assert(_.isObject(api.services));
    done();
  });

  it('should have a validate() function', function(done) {
    assert(_.isFunction(api.validate));
    done();
  });

  it('should have a secure() function', function(done) {
    assert(_.isFunction(api.secure));
    done();
  });

  it('should have a route() function', function(done) {
    assert(_.isFunction(api.route));
    done();
  });

});
