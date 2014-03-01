(function(window, document, angular){
  'use strict';

  angular.module('app').service('LastFmService', function ($http) {
    return {
      get: function(user, method, limit) {
        return $http.get('/api/lastfm/'+ user +'/'+ method +'/' + limit, { cache: true});
      }
    };
  });

})(this, this.document, this.angular);
