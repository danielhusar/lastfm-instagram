(function(window, document, angular){
  'use strict';

  angular.module('app', ['ngRoute', 'ngAnimate', 'slugifier'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/index.html',
          controller: 'LastFmController'
        })
        .when('/username/:username', {
          templateUrl: '/views/lastfm.html',
          controller: 'LastFmController'
        })
        .when('/username/:username/band/:band', {
          templateUrl: '/views/instagram.html',
          controller: 'InstagramController'
        })
        .otherwise({
          redirectTo: '/',
        });
    })
    .config(function ($anchorScrollProvider) {
      $anchorScrollProvider.disableAutoScrolling();
    })
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
    });

})(this, this.document, this.angular);
