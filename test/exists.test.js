
var assert = require('assert');
var api = require('../');

api.service('/exists', {
  fn: function() {}
});

describe('api.exists()', function() {

  it('should confirm a valid service', function(done) {
    assert(api.exists('/exists'));
    done();
  });

  it('should error on an invalid service', function(done) {
    assert(!api.exists('/exists2'));
    done();
  });

});
