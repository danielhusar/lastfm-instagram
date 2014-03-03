/*global describe, it, beforeEach, inject, expect*/
(function () {
	'use strict';

  /**
   * Index page tests
   */
	describe('LastFM Controller for the index page', function () {
		var ctrl, scope;

		beforeEach(module('app'));
		beforeEach(inject(function ($controller, $rootScope, $location, $routeParams) {
			scope = $rootScope.$new();
      ctrl = $controller('LastFmController', { $scope: scope });
		}));

		it('Theres should not be any artists on start', function () {
			expect(scope.artists.length).toBe(0);
		});

    it('Page should finish loading', function () {
      expect(scope.loading).toBe(false);
    });

  });

  /**
   * Last fm user page tests
   */
  describe('LastFM Controller for the username page', function () {
    var ctrl, scope, http;

    beforeEach(module('app'));
    beforeEach(inject(function ($controller, $rootScope, $location, $routeParams, $httpBackend) {
      http = $httpBackend;
      scope = $rootScope.$new();
      ctrl = $controller('LastFmController', { $scope: scope, $routeParams: {username: 'awtt'} });
    }));

    it('Page should finish loading', function () {
      http.when('GET','/api/lastfm/awtt/user.gettopartists/12').respond({topartists: {artist: [{}, {}]} });
      http.flush();
      expect(scope.loading).toBe(false);
    });

    it('User should be awtt', function () {
      expect(scope.username).toBe('awtt');
    });

    it('There should be 2 artists', function () {
      http.when('GET','/api/lastfm/awtt/user.gettopartists/12').respond({topartists: {artist: [{}, {}]} });
      http.flush();
      expect(scope.artists.length).toBe(2);
    });
  });


}());
