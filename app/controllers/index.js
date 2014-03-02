/**
 * Main controller for the frontend
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(model, helpers){
  'use strict';

  var index = function(req, res){
    helpers.template(res, 'index.html');
  };

  this.get('/', index);
  this.get('/username/:username', index);
  this.get('/username/:username/band/:band', index);

};
