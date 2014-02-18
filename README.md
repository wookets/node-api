
An api registry service for node.

## Install

In package.json;

```"api": "https://github.com/wookets/node-api/tarball/0.2.0"```

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

Comes with built-in express support.

Auto-generating documentation coming soon.
