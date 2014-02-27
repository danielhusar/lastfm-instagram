/**
 * Main front end model
 * @param  {object} app     app object
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(){
  'use strict';

	var model = {
		data : ['first', 'second', 'third'],
		edit : function(){},
		new  : function(){},
		delete : function(){}
	};

	return model;
};
