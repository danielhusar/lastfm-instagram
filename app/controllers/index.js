/**
 * Main controller for the frontend
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(model, helpers){
  'use strict';

	this.get('/', function(req, res){
		helpers.template(res, 'index.html', {});
	});

};
