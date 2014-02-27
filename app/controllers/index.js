'use strict';

/**
 * Main controller for the admin section
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(app, model, helpers){

	app.get('/', function(req, res){
		helpers.template(res, 'index.html', {});
	});

};
