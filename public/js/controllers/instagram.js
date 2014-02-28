(function(window, document, angular){
  'use strict';

  window.app.controller('InstagramController', function ($scope, $routeParams, $location, InstagramService) {
    var username = $routeParams.username;
    var band = $routeParams.band;
    $scope.username = username;
    $scope.band = band;
    $scope.loading = true;
    if(band){
      InstagramService.get(band).then(function(data){
         $scope.photos = data.data;
         $scope.loading = false;
      });
    }

    $scope.back = function(){
      $location.path( '/username/' + $scope.username );
    };

    $scope.lightbox = function(){
      $scope.image = window.outerWidth > 990 ? this.band.url : false;
    };

    $scope.close = function(){
      $scope.image = false;
    };
  });

})(this, this.document, this.angular);
