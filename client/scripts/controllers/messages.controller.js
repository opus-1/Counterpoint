angular.module('counterpoint').controller('MessagesCtrl',['$scope',
  function($scope) {

    $scope.helpers({
      messages: () => Messages.find({})
    });
  }]);
