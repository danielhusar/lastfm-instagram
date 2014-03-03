module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		files: [
      'public/components/angular/angular.js',
      'public/components/angular-route/angular-route.js',
      'public/components/angular-animate/angular-animate.js',
      'public/components/angular-slugify/angular-slugify.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/js/app.js',
      'public/js/controllers/*.js',
      'public/js/services/*.js',
			'test/unit/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};
