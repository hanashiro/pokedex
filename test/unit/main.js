'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('workspace'));

  beforeEach(inject(function($rootScope) {
  	scope = $rootScope.$new();
  }));

});
