(function(window, document, angular){
  'use strict';

  window.app.controller('InstagramController', function ($scope, $routeParams, $location, InstagramService) {
    var username = $routeParams.username;
    var band = $routeParams.band;
    $scope.username = username;
    $scope.band = band;
    if(band){
      InstagramService.get(band).then(function(data){
        $scope.photos = data.data;
      });
    }

    $scope.back = function(){
      $location.path( '/username/' + $scope.username );
    }
  });

})(this, this.document, this.angular);
