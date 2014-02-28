(function(window, document, angular){
  'use strict';

  window.app.service('InstagramService', function ($http) {
    return {
      get: function(band) {
        return $http.get('/api/instragram/' + band);
      }
    };
  });

})(this, this.document, this.angular);
