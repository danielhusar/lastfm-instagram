/**
 * Main front end model
 * @param  {object} app     app object
 * @param  {object} helpers helpers object
 * @return {void}
 */
module.exports = function(app, helpers){

	var model = {
		data : ['first', 'second', 'third'],
		edit : function(id, data){},
		new  : function(data){},
		delete : function(id){}
	}

	return model;
};