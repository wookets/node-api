
var assert = require('assert');
var api = require('../');

api.service('/check', {
  method: function() {}
});

describe('api.check()', function() {

  it('should confirm a valid service', function(done) {
    assert(api.check('/check'));
    done();
  });

  it('should error on an invalid service', function(done) {
    assert(!api.check('/check2'));
    done();
  });

});
