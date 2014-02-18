
var assert = require('assert');
var api = require('../');

api.service('/validate/me', {
  access: 'public',
  params: {
    name: {type: String, required: true}
  },
  fn: function(params, user, callback) {
    callback(null, 'moogle');
  }
});

describe('api.validate()', function() {

  it('should invoke with bad auth', function(done) {
    var params = {name: 'Heart'}
    api.invoke('/invoke/me', params, {}, function(err, result) {
      assert.equal(err.name, 'NotAuthorized');
      done();
    });
  });

  it('should invoke with bad params', function(done) {
    var user = {roles: ['manager']}
    api.invoke('/invoke/me', {}, user, function(err, result) {
      assert.equal(err.name, 'InvalidParam');
      done();
    });
  });

  it('should invoke with good params', function(done) {
    var params = {name: 'MooCow'}
    var user = {tenant: 'darling', roles: ['manager']}
    api.invoke('/invoke/me', params, user, function(err, result) {
      assert.equal(result, 'murmer');
      done();
    });
  });

  it('should invoke with good params and return super', function(done) {
    var params = {name: 'happy'}
    var user = {roles: ['manager']}
    api.invoke('/invoke/me', params, user, function(err, result) {
      assert.equal(result, 'super');
      done();
    });
  });

  it('should invoke with good params but still error', function(done) {
    var params = {name: 'koopoo'}
    var user = {roles: ['admin']}
    api.invoke('/invoke/me', params, user, function(err, result) {
      assert.equal(err.message, 'meowpants');
      done();
    });
  });
});