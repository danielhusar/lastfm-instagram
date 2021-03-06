(function(window, document, angular){
  'use strict';

  angular.module('app').controller('InstagramController', function ($scope, $routeParams, $location, InstagramService, $rootScope) {
    var username = $routeParams.username;
    var band = $routeParams.band;
    $scope.username = username;
    $scope.band = band;
    $scope.loading = true;
    $scope.error = false;
    if(band){
      InstagramService.get(band).success(function(data){
        $scope.photos = data;
        $scope.loading = false;
        $rootScope.title = 'Instagram feed for tag: ' + band;
      }).error(function(){
        $scope.loading = false;
      });
    }else{
      $rootScope.title = 'Error';
    }

    $scope.back = function() {
      $location.path( '/username/' + $scope.username );
    };

    $scope.lightbox = function(){
      $scope.image = window.outerWidth > 990 ? this.band.url : false;
    };

    $scope.close = function(e) {
      $scope.image = '';
    };
  });

})(this, this.document, this.angular);
