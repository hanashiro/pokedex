'use strict';

angular.module('workspace', ['ngAnimate', 'ngTouch', 'ngSanitize', 'firebase', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
