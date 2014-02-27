/**
	*  ALL THE STATIC ROUTES
	*  THIS ROUTES HERE OVERRIDES THE ROUTES DEFINED IN CONTROLLERS
**/
module.exports = function(helpers){
  'use strict';

	this.get('/test', function(req, res){
		helpers.template(res, 'index.html', {});
	});
};
