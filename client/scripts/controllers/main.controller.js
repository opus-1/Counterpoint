angular.module('counterpoint').controller('MainCtrl', ['$scope',
  function ($scope) {

    $scope.helpers({
      tasks: () => Tasks.find({})
    });

  }]);