
An api registry service for node.

## Install

In package.json;

```"api": "https://github.com/wookets/node-api/tarball/0.3.0"```

## Usage

```
var api = require('api');

// define the service somewhere...
api.service('/url/like', {
  access: 'public',
  params: {
    name: {type: String, required: true}
  },
  fn: function(params, user, callback) {
    callback(null, 'moogle');
  }
});

// later on invoke the service somewhere else...
var user = {roles: ['manager']}
api.invoke('/url/like', {}, user, function(err, result) {
  assert.equal(err.name, 'InvalidParam');
  done();
});
```

##### Point of contention... Why is 'access' required?

The property 'access' is required when registering a service because if you utilize express support (below)
your api services will be exposed to the world. Forcing you as a developer to label access as something or
even just 'public' to allow anyone to access the method is better than, "Oh, I forgot to label that / didnt know
anyone in the world could call that." Maybe I shouldn't force your hand to be held, but most service methods
should probably be private (at least 'user') anyway, or you can just override my secure method (see below) so...


## Express support

```
app.use('/api', api.route); // any calls to /api and the service will be looked up
```

If you want it to pass you the req and res (express) from the route, you can do the following...

```
api.service('/path', {
  params: {
    req: {},
    res: {} // you dont have to do both if you only need to access one
  },
  fn: (params, user, callback) {
    params.req
    params.res
  }
});
```


## Additional Usage

In 0.3.0 the following was added.

1. More hookable service methods.

```
var api = require('api');

api.service('/url', {
  access: 'user', // this old dog is still around
  secure: function(user, callback) { // and it works in conjunction with this old dog
    if (user.id === 'SPECIAL') {
      return callback(); // allow through
    }
    callback(Error('NotAuthorized'));
  }
});

```

FYI, access is called before secure. Remember you can override the whole security mech if you want (see below).

2. You can do the same thing with validation.

```
var api = require('api');

api.service('/url', {
  params: {} // maybe you just want to skip this, but this gets called before as well, so you can combo
  validate: function(params, callback) ( // this gets called after params is validated using built-in validation
    if (params.token !== 'SPECIAL') {
      return callback(Error('InvalidParam!'));
    }
    callback();
  }

});


```


3. Override security or validation that api uses globally.

```
var api = require('api');

api.secure = function(service, user, callback) {
  // check access first
  if (_.contains(service.access, 'public')) return callback();
  if (!_.any(service.access, function(role) {return _.contains(user.roles, role)})) {
    var err = Error('Not authorized to invoke the ' + service.path + ' service.');
    err.name = 'NotAuthorized';
    return callback(err);
  }
  // check secure function
  service.secure(user, callback);
}

api.validate = function(service, params, callback) {
  // check params
  var errors = validate(params, service.params);
  if(errors) {
    var err = new Error('One or more params is invalid.');
    err.name = 'InvalidParam';
    err.data = errors;
    return callback(err);
  }
  // check validate function on service def
  service.validate(params, callback);
}

```

Whenever you call api.invoke (or use the express route plugin) it will call your methods. Woot!
