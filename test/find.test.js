
var assert = require('assert');
var api = require('../');

api.service('/exists', {
  fn: function() {}
});

describe('api.find()', function() {

  it('should confirm a valid service', function(done) {
    assert(api.find('/exists'));
    done();
  });

  it('should error on an invalid service', function(done) {
    assert(!api.find('/exists2'));
    done();
  });

});
