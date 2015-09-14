'use strict';

angular.module('workspace')
  .controller('DetailsCtrl', ['$scope', '$firebaseArray', 'PokeListFct', '$location', function ($scope, $firebaseArray, PokeListFct, $location) {
  	
  	  $scope.Pokemon = PokeListFct.selected;
  	  
  	  if(!$scope.Pokemon){
        $location.url('/');
      } 
  	  
  	  $scope.View = {
  	    back: function(){
  	      $location.url('/');
  	    }
  	  }
  	  
  	  $scope.Comments = {
  	    list: [],
  	    newComment: {
  	      name: "",
  	      email: "",
  	      text: "",
  	      pokemon: $scope.Pokemon.name
  	    },
  	    add: function(){
  	      var comment = angular.copy(this.newComment);
  	      this.list.$add(comment);
  	      this.newComment = {pokemon: $scope.Pokemon.name};
  	    },
  	    start: function(){
  	      var ref = new Firebase("http://webpokedex.firebaseio.com/comments/"+$scope.Pokemon.name);
          this.list = $firebaseArray(ref);
  	    }
  	  }
  	  
       	
      
      
      $scope.Comments.start();
  	
  }]);
