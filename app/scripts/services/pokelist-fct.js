'use strict';

angular.module('workspace')
  .factory('PokeListFct', ['RestFct', '$location', function (RestFct, $location) {
  	var that = {
  	    selected: null,
  	    select: function(selected){
  	        RestFct.pokemon.find(selected.api,
  	            function(pokemon){
  	                that.preparePokemon(pokemon);
  	                $location.url('details');
  	            },
  	            function(err){
  	                console.log(err);
                }
            );
  	    },
  	    list: [],
        start: function(){
            RestFct.pokemon.listAll(
              function(pokemonList){
                  that.prepareList(pokemonList.pokemon);
              },
              function(err){
                  console.log(err);
              }
            );
        },
        preparePokemon: function(pokemon){
            that.setProperties(pokemon);
            pokemon.sprite = that.getNumber(pokemon.sprites[0].resource_uri);
            pokemon.description = that.getNumber(pokemon.descriptions[0].resource_uri);
            that.selected = pokemon;
            that.getPokemonSprite(pokemon.sprite);
            that.getPokemonDescription(pokemon.description);
        },
        prepareList: function(pokemon){
            that.list = pokemon;
            that.list.map(that.setProperties);
            that.list = that.list.filter(that.removeSpecialForms);
            that.list = that.list.sort(that.sort);
        },
        setProperties: function(pokemon){
            pokemon.api = that.getNumber(pokemon.resource_uri);
            pokemon.number =that.getPokemonNumber(pokemon.api);
            pokemon.api = parseInt(pokemon.api);
            pokemon.name = that.getName(pokemon.name);
        },
        getNumber: function(resource_uri){
            return resource_uri.replace(/([a-z][0-9])|\D/gi,'');
        },
        getName: function(name){
            return name.replace(/-[a-z]{3,}/gi,'');
        },
        getPokemonNumber: function(apiNumber){
            if(apiNumber.length <= 3){
                return ("000" + apiNumber).slice(-3);
            }else{
                return null;
            }
        },
        getPokemonSprite: function(spriteNumber){
            RestFct.sprite.find(spriteNumber,
                function(sprite){
                    that.selected.sprite =  "http://pokeapi.co" + sprite.image;
                },
                function(err){
                    console.log(err);
                }
            );
        },
        getPokemonDescription: function(descriptionNumber){
            RestFct.description.find(descriptionNumber,
                function(resp){
                    that.selected.description =  resp.description;
                },
                function(err){
                    console.log(err);
                }
            )
        },
        removeSpecialForms: function(pokemon){
            if(pokemon.number){
                return true;
            }return false;
        },
        sort: function(a, b){
            if (a.api > b.api) {
                return 1;
            }
            if (a.api < b.api) {
                return -1;
            }
            return 0;
        }
  	}
  	that.start();
  	return that;
  }]);
