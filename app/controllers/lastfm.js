/**
 * Main controller for the lastfm api
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(){
  'use strict';

  var http = require('http');

  this.get('/lastfm/:user/:method/:limit?', function(req, res){
    var limit = req.params.limit || 10,
        method = req.params.method,
        user = req.params.user,
        api = require(process.cwd() +'/config/api').lastFm.api;

    var url = 'http://ws.audioscrobbler.com/2.0/?method='+ method +'&user='+ user +'&api_key='+ api +'&limit='+ limit +'&format=json';

    http.get(url, function(response) {
      var body = '';
      response.on('data', function(chunk) {
        body += chunk;
      });

      response.on('end', function() {
        res.json(JSON.parse(body));
      });
    }).on('error', function() {
      res.json({error: 'error occured'});
    });
  });

};
