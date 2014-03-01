(function(window, document, angular){
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngAnimate', 'slugifier'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          title: 'Please select username',
          templateUrl: '/views/index.html',
          controller: 'LastFmController'
        })
        .when('/username/:username', {
          title: 'Your top 12 bands',
          templateUrl: '/views/lastfm.html',
          controller: 'LastFmController'
        })
        .when('/username/:username/band/:band', {
          title: 'Instagram feed',
          templateUrl: '/views/instagram.html',
          controller: 'InstagramController'
        })
        .otherwise({
          redirectTo: '/',
        });
    })
    .config(function ($anchorScrollProvider) {
        $anchorScrollProvider.disableAutoScrolling();
      }
    )
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
    });

})(this, this.document, this.angular);
