/*
 * Generate template
 * @param(res) res
 * @param(template)
 *
 */
exports.template = function(res, template, variables){
  'use strict';

	variables.enviroment = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development';
	res.render(template, variables);
};
