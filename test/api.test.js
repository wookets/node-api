
var assert = require('assert');
var _ = require('lodash');
var api = require('../');

describe('api', function() {

  it('should have a check() function', function(done) {
    assert(_.isFunction(api.check));
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
