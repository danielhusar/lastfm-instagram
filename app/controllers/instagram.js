/**
 * Main controller for the isntragram api
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(){
  'use strict';

  this.get('/instragram/:tag', function(req, res){
    var instragram = require('instagram-node-lib'),
      config = require(process.cwd() +'/config/api').instragram;

    instragram.set('client_id', config.api);
    instragram.set('client_secret', config.secret);

    instragram.tags.recent({
      'name': req.params.tag,
      complete: function(data, pagination){
        res.json(data.map(function(val, index){
          return val.images.standard_resolution;
        }));
      }
    });


  });

};
