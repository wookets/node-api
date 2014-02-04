
var assert = require('assert');
var api = require('../');

api.service('/admin', {
  access: ['admin'],
  method: function(params, session, callback) {callback()}
});
api.service('/mixed', {
  access: ['admin', 'user'],
  method: function(params, session, callback) {callback()}
});
api.service('/user', {
  access: ['user'],
  method: function(params, session, callback) {callback()}
});
api.service('/public', {
  access: 'public',
  method: function(params, session, callback) {callback()}
});
api.service('/deny', {
  method: function(params, session, callback) {callback()}
});

public = {}
user = {roles: ['user']}
admin = {roles: ['admin', 'user']}

describe('api.secure()', function() {

  it('should allow an admin to access an admin service', function(done) {
    api.invoke('/admin', {}, admin, function(err) {
      assert(!err);
      done();
    })
  });

  it('should allow an admin to access any service', function(done) {
    api.invoke('/mixed', {}, admin, function(err) {
      assert(!err);
      done();
    });
  });

  it('should allow a user to access any service', function(done) {
    api.invoke('/mixed', {}, user, function(err) {
      assert(!err);
      done();
    });
  });

  it('should deny a user to access undefined access service', function(done) {
    api.invoke('/deny', {}, user, function(err) {
      assert(err);
      done();
    });
  });

  it('should deny an admin to access undefined access service', function(done) {
    api.invoke('/deny', {}, admin, function(err) {
      assert(err);
      done();
    });
  });

  it('should deny an admin to access undefined access service', function(done) {
    api.invoke('/deny', {}, admin, function(err) {
      assert(err);
      done();
    });
  });

  it('should allow an admin to access a public service', function(done) {
    api.invoke('/public', {}, admin, function(err) {
      assert(!err);
      done();
    });
  });

  it('should allow a user to access a public service', function(done) {
    api.invoke('/public', {}, user, function(err) {
      assert(!err);
      done();
    });
  });

  it('should allow an admin to access a user only service', function(done) {
    api.invoke('/user', {}, admin, function(err) {
      assert(!err);
      done();
    });
  });

  it('should not allow a user to access an admin only service', function(done) {
    api.invoke('/admin', {}, user, function(err) {
      assert(err);
      done();
    });
  });

});
