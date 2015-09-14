'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://pokedex-hanashiro.c9.io:8081/#/');
  });

  it('should list all Pokemon', function () {
    element.all(by.repeater('pokemon in Pokemon.list')).count().then(function(count) {
      expect(count === 718).toBeTruthy();
    });
  });
  
  it('should select a Pokemon', function () {
    element.all(by.css('.poke-list-item')).get(0).click();
    expect( element.all(by.css('#pokemon-id')) ).toContain( "Bulbasaur" );
  });

});
