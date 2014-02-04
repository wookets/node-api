
module.exports = {
  /**
   * A key value store of all the services that have been registered using api.service(path, def)
   * key: the path e.g. '/api/sauce/method'
   * value: a function e.g. (ctx, callback)
   */
  services: {}
};