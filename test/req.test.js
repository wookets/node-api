
var assert = require('assert');
var api = require('../');

api.service('/req', {
  access: 'public',
  params: {
    req: {},
    res: {}
  },
  fn: function(params, user, callback) {
    callback(null, params);
  }
});

describe('api.invoke() w/ req res', function() {

  it('should include req and res if listed in params', function(done) {
    var req = {path: '/req', body: {}};
    var res = {
      send: function(data) {
        assert(data.req);
        assert(data.res);
        done();
      }
    };
    api.route(req, res, function(err) {});

  });

});


//module.exports = function(req, res, next) {
//  var params = _.extend(req.body, req.query);
//  var service = api.find(req.path);
//  if (service && service.params && service.params.req) {
//    params.req = req;
//  }
//  if (service && service.params && service.params.res) {
//    params.res = res;
//  }
//  var user = req.user || req.session;
//  api.invoke(req.path, params, user, function(err, result) {
//    if (err) return next(err);
//    if (api.jsend) {
//      res.send({status: 'success', data: result});
//    } else {
//      res.send(result);
//    }
//  });