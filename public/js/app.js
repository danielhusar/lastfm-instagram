(function(window, document, angular){
  'use strict';

  window.app = angular.module('app', ['ngRoute', 'ngAnimate', 'slugifier'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          title: 'Please select username',
          templateUrl: '/views/lastfm.html',
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
    .config( ['$anchorScrollProvider',
      function($anchorScrollProvider) {
        $anchorScrollProvider.disableAutoScrolling();
      }
    ])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
    }])
    .run(['$location', '$rootScope', function($location, $rootScope) {
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
      });
    }]);

})(this, this.document, this.angular);
