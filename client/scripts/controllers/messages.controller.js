/*
	 Copyright IBM Corp. 2016
*/
angular.module('counterpoint').controller('MessagesCtrl',['$scope',
  function($scope) {

    $scope.helpers({
      messages: () => Messages.find({read: false},{sort: {createdAt: -1}, limit: 15})
    });
  }]);
