var _ = require('lodash');
var sync = require('synchronize');
var request = require('request');

sync(request, 'get');

var cache = {};

module.exports = {
  fetch: function (url, params) {
    var headers = _.extend({
      'User-Agent': 'request'
    }, params.headers);
    
    if (cache[url]) {
      var res = cache[url];
    }
    
    else {
      var res = request.get(url, { headers: headers });
      cache[url] = res;
    }
    
    return {
      getContentText: function () {
        if (res.statusCode !== 200) {
          console.error(res.body);
        }
        
        return res.body;
      },
      getResponseCode: function () { return res.statusCode; }
    };
  }
};