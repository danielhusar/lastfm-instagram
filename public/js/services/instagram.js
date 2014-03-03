(function(window, document, angular){
  'use strict';

  angular.module('app').service('InstagramService', function ($http) {
    return {
      get: function(band) {
        return $http({method: 'GET', url: '/api/instragram/' + band, cache: true});
      }
    };
  });

})(this, this.document, this.angular);
