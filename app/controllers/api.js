/**
 * Main controller for the api
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(model, helpers){
  'use strict';

  var http = require('http'),
    config = require(process.cwd() +'/config/api');

  /**
   * Instagram json api
   * @param  {object} req request
   * @param  {object} res response
   * @return {void}
   */
  this.get('/api/instragram/:tag', function(req, res){
    var instragram = require('instagram-node-lib'),
      cacheName = 'instagram-tags-' + req.params.tag,
      cache = helpers.cache.returnCache(cacheName, 600),
      api = config.instragram;

    if (cache) {
      res.json(cache);
    } else {
      instragram.set('client_id', api.api);
      instragram.set('client_secret', api.secret);

      instragram.tags.recent({
        'name': req.params.tag,
        complete: function(data){
          var results = data.map(function(val){
            return val.images.standard_resolution;
          });
          helpers.cache.storeCache(cacheName, results);
          res.json(results);
        }
      });
    }
  });


  /**
   * Last FM json API proxy
   * @param  {object} req request
   * @param  {object} res response
   * @return {void}
   */
  this.get('/api/lastfm/:user/:method/:limit?', function(req, res){
    var limit = req.params.limit || 10,
        method = req.params.method,
        user = req.params.user,
        cacheName = 'lastfm-' + method.replace(/\./gi, '-') + '-' + user + '-' + limit,
        cache = helpers.cache.returnCache(cacheName, 600),
        api = config.lastFm.api,
        url = 'http://ws.audioscrobbler.com/2.0/?method='+ method +'&user='+ user +'&api_key='+ api +'&limit='+ limit +'&format=json';

    if(cache) {
      res.json(cache);
    } else {
      http.get(url, function(response) {
        var body = '';
        response.on('data', function(chunk) {
          body += chunk;
        });

        response.on('end', function() {
          helpers.cache.storeCache(cacheName, JSON.parse(body));
          res.json(JSON.parse(body));
        });
      }).on('error', function() {
        res.json({error: 'error occured'});
      });
    }
  });

};
