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
  	      pokemon: ($scope.Pokemon ? $scope.Pokemon.name : "")
  	    },
  	    add: function(){
  	      if(this.validateBeforeSend()){
    	      var comment = angular.copy(this.newComment);
    	      this.list.$add(comment);
    	      this.newComment = {pokemon: ($scope.Pokemon ? $scope.Pokemon.name : "")};
  	      }
  	    },
  	    start: function(){
  	      var ref = new Firebase("http://webpokedex.firebaseio.com/comments/"+($scope.Pokemon ? $scope.Pokemon.name : ""));
          this.list = $firebaseArray(ref);
  	    },
  	    validateBeforeSend: function(){
  	      if(!this.newComment.name){
  	        alert('Insert your name to comment');
  	        return false;
  	      }  
  	      if(!this.validateEmail(this.newComment.email)){
  	        alert('Insert a valid email to comment');
  	        return false;
  	      }
  	      if(!this.newComment.text){
  	        alert('Write something to comment');
  	        return false;
  	      }
  	      return true;
  	    },
  	    validateEmail: function(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        }
  	  }
  	  
       	
      
      
      $scope.Comments.start();
  	
  }]);
