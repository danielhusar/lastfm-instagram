(function(window, document, angular){
  'use strict';

  angular.module('app').controller('LastFmController', function ($scope, $routeParams, $location, LastFmService, Slug, $rootScope) {
    var username = $routeParams.username;
    $scope.username = username;
    $scope.loading = true;
    $scope.homepage = false;
    if(username){
      $rootScope.title = 'Top 12 artist for: ' + username;
      LastFmService.get(username, 'user.gettopartists', 12).then(function(data){
        $scope.artists = data.data.topartists ? data.data.topartists.artist : [];
        $scope.loading = false;
      });
    }else{
      $rootScope.title = 'Please selet username';
      $scope.loading = false;
      $scope.homepage = true;
    }

    $scope.submit = function(){
      $location.path( '/username/' + Slug.slugify(this.username) );
    };

    $scope.instagram = function(artist){
      $location.path( '/username/'+ $scope.username +'/band/' +  Slug.slugify(artist).replace(/\-/g, ''));
    };
  });

})(this, this.document, this.angular);
