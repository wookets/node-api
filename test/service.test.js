
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
    api.service('/service54', {fn: function() {}});
    assert(api.services['/service54']);
    done();
  });

  it('should register a valid service', function(done) {
    api.service('/service54', {fn: function() {}});
    assert.equal(api.services['/service54'].path, '/service54');
    done();
  });

  it('should register a complete service', function(done) {
    api.service('/add-user-example', {
      access: ['admin', 'manager'],
      params: {
        name: {type: String, required: true},
        description: {type: String},
        age: {type: Number},
        birthday: {type: Date, required: true},
        active: {type: Boolean, default: true}
      },
      fn: function(params, user, callback) {

      }
    });
    srv = api.services['/add-user-example'];
    assert.equal(srv.access[1], 'manager');
    assert.equal(srv.params.name.type, String);
    assert.equal(srv.params.birthday.required, true);
    assert(srv.fn);
    done();
  });
});
