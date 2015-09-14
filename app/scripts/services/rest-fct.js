'use strict';

angular.module('workspace')
  .factory('RestFct', ['$http', function (http) {
  	var url = 'http://pokeapi.co/api/v1/';
  
    var api = (function(){
    	return{
        get : function(endpoint,success,error){
    		  http({
            method: 'GET', 
            url: url+endpoint,
          })
          .success(success)
          .error(error);
        }
      };
    })();
    
    var app = {
      description: {
        find: function(pokeNumber, success, error){
          api.get('description/' + pokeNumber + '/', success, error);
        }
      },
      pokemon: {
        listAll: function(success, error){
          api.get('pokedex/1/', success, error);
        },
        find: function(pokeNumber, success, error){
          api.get('pokemon/' + pokeNumber + '/', success, error);
        }
      },
      sprite: {
        find: function(pokeNumber, success, error){
          api.get('sprite/' + pokeNumber + '/', success, error);
        }
      }
    };
    return app;
  }]);
