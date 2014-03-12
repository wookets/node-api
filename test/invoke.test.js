
var assert = require('assert');
var api = require('../');

api.service('/invoke/me', {
  access: ['admin', 'manager'],
  params: {
    name: {type: String, required: true}
  },
  fn: function(ctx) {
    if (ctx.user.tenant === 'darling') {
      return ctx.send('murmer')
    }
    if (ctx.params.name === 'happy') {
      return ctx.send('super')
    } else {
      return ctx.throw('meowpants')
    }
  }
});

describe('api.invoke()', function() {

  it('should invoke a path that doesnt exist', function(done) {
    api.invoke('/dont-exist', {}, function(err, result) {
      assert.equal(err.name, 'NotFound');
      assert.equal(err.status, 404);
      done();
    });
  });

  it('should invoke with bad auth', function(done) {
    var ctx = {params: {name: 'Heart'}}
    api.invoke('/invoke/me', ctx, function(err, result) {
      assert.equal(err.name, 'NotAuthorized');
      done();
    });
  });

  it('should invoke with bad params', function(done) {
    var ctx = {user: {roles: ['manager']}}
    api.invoke('/invoke/me', ctx, function(err, result) {
      assert.equal(err.name, 'BadRequest');
      assert.equal(err.status, 400);
      done();
    });
  });

  it('should invoke with good params', function(done) {
    var ctx = {
      params: {name: 'MooCow'},
      user: {tenant: 'darling', roles: ['manager']}
    }
    api.invoke('/invoke/me', ctx, function(err, result) {
      assert.equal(result, 'murmer');
      done();
    });
  });

  it('should invoke with good params and return super', function(done) {
    var ctx = {
      params: {name: 'happy'},
      user: {roles: ['manager']}
    }
    api.invoke('/invoke/me', ctx, function(err, result) {
      assert.equal(result, 'super');
      done();
    });
  });

  it('should invoke with good params but still error', function(done) {
    var ctx = {
      params: {name: 'koopoo'},
      user: {roles: ['admin']}
    }
    api.invoke('/invoke/me', ctx, function(err, result) {
      assert.equal(err.message, 'meowpants');
      done();
    });
  });
});