(function(window, document, angular){
  'use strict';

  window.app = angular.module('app', ['ngRoute', 'slugifier'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/lastfm.html',
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
    .config( ['$anchorScrollProvider',
      function($anchorScrollProvider) {
        $anchorScrollProvider.disableAutoScrolling();
      }
    ])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }]);

})(this, this.document, this.angular);
