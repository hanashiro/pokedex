'use strict';

angular.module('workspace', ['ngAnimate', 'ngTouch', 'ngSanitize', 'firebase', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/details', {
        templateUrl: 'partials/details.html',
        controller: 'DetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
