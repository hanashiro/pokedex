/* global Firebase */

'use strict';

angular.module('workspace')
  .controller('MainCtrl', function ($scope, $firebase, PokeListFct) {
  	$scope.Pokemon = PokeListFct;
  	$scope.View = {
  	  filter: ""
  	}
  	
  	$(document).on( 'scroll', function(){
       var scroll = $(this).scrollTop();
       $('.pokeball-back').css({'transform':'translateY(-50%) rotateZ(' + scroll/15 + 'deg)'});
    });
  	
  });
