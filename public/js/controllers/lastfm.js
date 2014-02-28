(function(window, document, angular){
  'use strict';

  window.app.controller('LastFmController', function ($scope, $routeParams, $location, LastFmService, Slug) {
    var username = $routeParams.username;
    $scope.username = username;
    $scope.loading = true;
    $scope.homepage = false;
    if(username){
      LastFmService.get(username, 'user.gettopartists', 12).then(function(data){
        $scope.artists = data.data.topartists ? data.data.topartists.artist : [];
        $scope.loading = false;
      });
    }else{
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
