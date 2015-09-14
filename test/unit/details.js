'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('workspace'));

  beforeEach(inject(function($rootScope) {
  	scope = $rootScope.$new();
  }));

  it('should validate email', inject(function($controller) {
    $controller('DetailsCtrl', {
      $scope: scope
  	});

    expect(scope.Comments.validateEmail('asdf')).toBeFalsy();
    expect(scope.Comments.validateEmail('123')).toBeFalsy();
    expect(scope.Comments.validateEmail('sadf@')).toBeFalsy();
    expect(scope.Comments.validateEmail('123@')).toBeFalsy();
    expect(scope.Comments.validateEmail('@asdf')).toBeFalsy();
    expect(scope.Comments.validateEmail('@123')).toBeFalsy();
    expect(scope.Comments.validateEmail('asdf@sadf')).toBeFalsy();
    expect(scope.Comments.validateEmail('@.com')).toBeFalsy();
    expect(scope.Comments.validateEmail('asdf@123.com')).toBeTruthy();
  }));
  
  it('should validate comment before send', inject(function($controller) {
    $controller('DetailsCtrl', {
      $scope: scope
  	});

    expect(scope.Comments.validateBeforeSend()).toBeFalsy();
    
    scope.Comments.newComment.name = "name";
    expect(scope.Comments.validateBeforeSend()).toBeFalsy();
    
    scope.Comments.newComment.email = "asdf@123.com";
    expect(scope.Comments.validateBeforeSend()).toBeFalsy();
    
    scope.Comments.newComment.text = "sometext";
    expect(scope.Comments.validateBeforeSend()).toBeTruthy();
    
  }));
  
});
