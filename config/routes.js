/**
	*  ALL THE STATIC ROUTES WITH ANONYMOUS FUNCTIONS
	*  THIS ROUTES HERE OVERRIDES THE ROUTES DEFINED IN CONTROLLERS
**/
module.exports = function(app, helpers){
  'use strict';

	app.get('/test', function(req, res){
		helpers.template(res, 'index.html', {});
	});
};
