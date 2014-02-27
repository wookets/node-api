
var assert = require('assert');
var api = require('../');

api.service('/exists', {
  fn: function() {}
});

describe('api.find()', function() {

  it('should confirm a valid service', function(done) {
    assert(api.find(api.services, '/exists'));
    done();
  });

  it('should error on an invalid service', function(done) {
    assert(!api.find(api.services, '/exists2'));
    done();
  });

});
